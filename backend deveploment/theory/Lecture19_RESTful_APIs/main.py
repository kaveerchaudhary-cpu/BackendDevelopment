
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_

import models
from database import Base, engine, get_db
from schemas import (
    StudentCreate,
    StudentUpdate,
    StudentResponse,
    StudentListResponse,
    BranchEnum,
    CourseCreate,
    CourseResponse,
    EnrollmentCreate,
    EnrollmentResponse,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Student Management API")


@app.get("/")
def home():
    return {"message": "Student Management API is running!"}


# Create a student
@app.post("/students", response_model=StudentResponse)
def create_student(
    student: StudentCreate,
    db: Session = Depends(get_db)
):
    new_student = models.Student(**student.model_dump())

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return new_student


# Get all students
@app.get("/students", response_model=list[StudentResponse])
def get_students(db: Session = Depends(get_db)):
    return db.query(models.Student).all()


# Filter, search, and paginate students
# IMPORTANT: Keep this route above /students/{student_id}
@app.get("/students/filter", response_model=StudentListResponse)
def filter_students(
    page: int = 1,
    limit: int = 10,
    branch: BranchEnum = None,
    department_id: int = None,
    search: str = None,
    db: Session = Depends(get_db)
):
    if page < 1:
        raise HTTPException(
            status_code=422,
            detail="Page must be at least 1"
        )

    if limit < 1:
        raise HTTPException(
            status_code=422,
            detail="Limit must be at least 1"
        )

    query = db.query(models.Student)

    if branch is not None:
        query = query.filter(
            models.Student.branch == branch.value
        )

    if department_id is not None:
        query = query.filter(
            models.Student.department_id == department_id
        )

    if search:
        query = query.filter(
            or_(
                models.Student.name.ilike(f"%{search}%"),
                models.Student.email.ilike(f"%{search}%")
            )
        )

    total = query.count()
    total_pages = (total + limit - 1) // limit

    students = (
        query.order_by(models.Student.id)
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
        "students": students
    }


# Get one student by ID
@app.get("/students/{student_id}", response_model=StudentResponse)
def get_student(
    student_id: int,
    db: Session = Depends(get_db)
):
    student = db.query(models.Student).filter(
        models.Student.id == student_id
    ).first()

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return student


# Update a student
@app.put("/students/{student_id}", response_model=StudentResponse)
def update_student(
    student_id: int,
    student_data: StudentUpdate,
    db: Session = Depends(get_db)
):
    student = db.query(models.Student).filter(
        models.Student.id == student_id
    ).first()

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    update_data = student_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        if hasattr(value, "value"):
            value = value.value
        setattr(student, key, value)

    db.commit()
    db.refresh(student)

    return student


# Delete a student
@app.delete("/students/{student_id}")
def delete_student(
    student_id: int,
    db: Session = Depends(get_db)
):
    student = db.query(models.Student).filter(
        models.Student.id == student_id
    ).first()

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    db.delete(student)
    db.commit()

    return {"message": "Student deleted successfully"}

@app.post("/courses", response_model=CourseResponse)
def create_course(
    course: CourseCreate,
    db: Session = Depends(get_db)
):
    new_course = models.Course(**course.model_dump())

    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return new_course

@app.post(
    "/students/{student_id}/enrollments",
    response_model=EnrollmentResponse
)
def enroll_student(
    student_id: int,
    enrollment: EnrollmentCreate,
    db: Session = Depends(get_db)
):
    student = db.query(models.Student).filter(
        models.Student.id == student_id
    ).first()

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    course = db.query(models.Course).filter(
        models.Course.id == enrollment.course_id
    ).first()

    if course is None:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    new_enrollment = models.Enrollment(
        student_id=student_id,
        course_id=enrollment.course_id
    )

    db.add(new_enrollment)
    db.commit()
    db.refresh(new_enrollment)

    return new_enrollment

@app.get(
    "/students/{student_id}/enrollments",
    response_model=list[EnrollmentResponse]
)
def get_student_enrollments(
    student_id: int,
    db: Session = Depends(get_db)
):
    student = db.query(models.Student).filter(
        models.Student.id == student_id
    ).first()

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return db.query(models.Enrollment).filter(
        models.Enrollment.student_id == student_id
    ).all()

@app.get("/courses", response_model=list[CourseResponse])
def get_courses(db: Session = Depends(get_db)):
    return db.query(models.Course).all()
