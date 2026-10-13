from fastapi import FastAPI
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import date

app = FastAPI()


class StudentCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    branch: str = Field(..., pattern=r"^(CSE|ECE|IT|ME|CE)$")
    enrollment_date: Optional[date] = None


class StudentResponse(BaseModel):
    id: int
    name: str
    email: str
    branch: str
    enrollment_date: date


students = []


@app.post("/students", response_model=StudentResponse, status_code=201)
def create_student(student: StudentCreate):
    student_id = len(students) + 1

    student_data = {
        "id": student_id,
        "name": student.name,
        "email": str(student.email),
        "branch": student.branch,
        "enrollment_date": student.enrollment_date or date.today()
    }

    students.append(student_data)
    return student_data