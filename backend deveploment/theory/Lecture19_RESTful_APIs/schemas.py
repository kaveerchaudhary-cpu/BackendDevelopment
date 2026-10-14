
from enum import Enum
from pydantic import BaseModel, EmailStr
from typing import Optional, List


class BranchEnum(str, Enum):
    CSE = "CSE"
    ECE = "ECE"
    ME = "ME"
    CIVIL = "CIVIL"


class DepartmentCreate(BaseModel):
    name: str


class DepartmentResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class StudentCreate(BaseModel):
    name: str
    age: int
    email: EmailStr
    branch: BranchEnum
    department_id: Optional[int] = None


class StudentUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    email: Optional[EmailStr] = None
    branch: Optional[BranchEnum] = None
    department_id: Optional[int] = None


class StudentResponse(BaseModel):
    id: int
    name: str
    age: int
    email: EmailStr
    branch: str
    department_id: Optional[int] = None

    class Config:
        from_attributes = True


class StudentListResponse(BaseModel):
    total: int
    page: int
    limit: int
    total_pages: int
    students: List[StudentResponse]


class CourseCreate(BaseModel):
    title: str
    description: Optional[str] = None


class CourseResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None

    class Config:
        from_attributes = True


class EnrollmentCreate(BaseModel):
    course_id: int


class EnrollmentResponse(BaseModel):
    id: int
    student_id: int
    course_id: int

    class Config:
        from_attributes = True


class ErrorResponse(BaseModel):
    detail: str
