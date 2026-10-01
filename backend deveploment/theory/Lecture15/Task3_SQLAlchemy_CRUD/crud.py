from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

Base = declarative_base()


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)

    students = relationship("Student", back_populates="department")


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    branch = Column(String(50), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"))

    department = relationship("Department", back_populates="students")


# Create database
engine = create_engine("sqlite:///crud_student.db")
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()


# 1. CREATE — Create or reuse Department
department = session.query(Department).filter_by(
    name="Computer Science"
).first()

if department is None:
    department = Department(name="Computer Science")
    session.add(department)
    session.commit()

# Create Student
student = Student(
    name="Kabir Chaudhary",
    email="kabir.chaudhary@upes.ac.in",
    branch="CSE",
    department_id=department.id
)

session.add(student)
session.commit()

print("1. Student Created:")
print(
    student.name,
    "-",
    student.email,
    "-",
    student.branch,
    "-",
    student.department.name
)


# 2. READ — Retrieve students in CSE branch
students = session.query(Student).filter_by(branch="CSE").all()

print("\n2. Students in CSE:")
for s in students:
    print(s.id, s.name, s.email)


# 3. UPDATE — Change student's branch
student.branch = "ECE"
session.commit()

print("\n3. Student Branch Updated:")
print(student.name, "-", student.branch)


# 4. DELETE — Delete the student
student_id = student.id

session.delete(student)
session.commit()

# Verify deletion
deleted_student = session.query(Student).filter_by(id=student_id).first()

print("\n4. Student Deleted:")
print("Student exists:", deleted_student is not None)


session.close()