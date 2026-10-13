# Lecture 5: Student Management API with FastAPI

**Course:** Backend Development

**Project:** FastAPI Student Management API

## 1. Lecture overview

Lecture 5 builds a REST-style student API using FastAPI and Pydantic. It demonstrates typed request parameters, JSON request and response bodies, data models, CRUD routes, HTTP status codes, and automatic API documentation. Student records are held in a Python list, so this is a learning example rather than a persistent database-backed application.

This project is separate from Lecture 4: the Lecture 4 Express server uses port `3000`, while this FastAPI application listens on `127.0.0.1:5000`.

## 2. Project files and dependencies

- `FastAPI/fastapi-project/main.py` defines the FastAPI application, Pydantic models, in-memory data, endpoints, and local server startup.
- `FastAPI/fastapi-project/requirements.txt` lists `fastapi` and `uvicorn`.
- `FastAPI/fastapi-project/.gitignore` excludes the local virtual environment, Python bytecode, and `__pycache__`.

FastAPI handles the HTTP routes and request/response processing. Pydantic validates and structures student data. Uvicorn runs the ASGI application.

## 3. Installing and running the application

From the `FastAPI/fastapi-project` directory, create and activate a virtual environment, install the requirements, and start the application:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py
```

The script starts Uvicorn with the application import string `main:app`, binds to `127.0.0.1`, uses port `5000`, and enables reload mode for development. The API is available at:

```text
http://127.0.0.1:5000
```

Alternatively, run Uvicorn directly from the project directory:

```powershell
uvicorn main:app --host 127.0.0.1 --port 5000 --reload
```

## 4. Pydantic data models

The application defines two Pydantic models:

### `Student`

Represents a student returned by the API. It contains:

- `id`: integer identifier
- `name`: student name as a string
- `branch`: branch name as a string

### `StudentCreate`

Represents the fields supplied when creating or replacing a student:

- `name`: required string
- `branch`: required string

The client does not submit an ID when creating a student. The server assigns the ID itself. FastAPI uses the model type annotations to parse and validate request data and to describe API schemas.

## 5. Initial records and in-memory storage

At startup, `main.py` creates three student records:

| ID | Name | Branch |
|---:|---|---|
| 1 | Aarav | CSE |
| 2 | Diya | ECE |
| 3 | Rohan | IT |

The records are stored in the module-level `students` list. The `next_id` counter begins at `4` and supplies IDs for new students. Creating, updating, or deleting a record changes this list while the process is running. There is no database or file persistence, so these changes are lost when the application restarts.

## 6. API endpoints

### List students — `GET /students`

Returns the student list with HTTP 200. The optional `branch` query parameter filters the results; comparison is case-insensitive.

```text
GET /students
GET /students?branch=CSE
```

The route declares `response_model=List[Student]`, so FastAPI documents and serializes the response as a list of student objects.

### Get one student — `GET /students/{student_id}`

Uses an integer path parameter to locate a record by ID. A matching record is returned with HTTP 200. If no record has that ID, the endpoint raises `HTTPException` with HTTP 404 and the detail `"Student not found"`.

```text
GET /students/1
```

FastAPI parses the path parameter as an integer. A value that cannot be parsed as an integer is rejected as invalid input before the endpoint's lookup runs.

### Create a student — `POST /students`

Accepts a JSON body matching `StudentCreate`. The handler converts that model to a dictionary with `model_dump()`, combines it with the assigned ID to create a `Student`, appends the new record to the list, increments `next_id`, and returns the created record with HTTP 201.

Example request body:

```json
{
  "name": "Priya",
  "branch": "CSE"
}
```

### Replace a student — `PUT /students/{student_id}`

Accepts the same `StudentCreate` body and replaces the matching record's name and branch. The ID remains the one from the URL. The updated record is returned with HTTP 200. If the ID is not present, the endpoint responds with HTTP 404.

### Delete a student — `DELETE /students/{student_id}`

Removes the matching record from the list. On success, the route returns HTTP 204 (No Content) and no response body. If the ID is not present, the endpoint raises HTTP 404.

## 7. Route summary

| Method | Route | Successful response | Purpose |
|---|---|---|---|
| GET | `/students` | 200 JSON | Return all students. |
| GET | `/students?branch=CSE` | 200 JSON | Filter students by branch, case-insensitively. |
| GET | `/students/{student_id}` | 200 JSON | Return one student; missing IDs return 404. |
| POST | `/students` | 201 JSON | Create a student and assign its ID. |
| PUT | `/students/{student_id}` | 200 JSON | Replace an existing student's name and branch. |
| DELETE | `/students/{student_id}` | 204 empty body | Delete a student. |

Invalid request data or an invalid typed parameter is handled by FastAPI's request validation and normally returns HTTP 422. A validly formed request for a student ID that does not exist returns HTTP 404 from the application's explicit error handling.

## 8. Automatic API documentation

FastAPI generates an OpenAPI schema from the route declarations, type hints, and Pydantic models. With the server running, the interactive Swagger UI is available at:

```text
http://127.0.0.1:5000/docs
```

The ReDoc documentation is available at:

```text
http://127.0.0.1:5000/redoc
```

These pages describe the endpoints, parameters, request bodies, response models, and status codes. Swagger UI can also be used to issue test requests directly from the browser.

## 9. Concepts demonstrated

- **REST-style resource routes:** `/students` represents the collection, and `/students/{student_id}` represents an individual student.
- **HTTP methods:** GET reads data, POST creates a record, PUT replaces its editable fields, and DELETE removes it.
- **Path parameters:** `student_id` selects one student and is declared as an integer.
- **Query parameters:** `branch` optionally filters the student collection.
- **JSON bodies:** POST and PUT receive the student name and branch as structured data.
- **Typed models:** Pydantic models define expected student fields, and `response_model` describes output.
- **HTTP status codes:** The API distinguishes successful reads, creation, deletion, missing resources, and invalid input.
- **ASGI development server:** Uvicorn serves the FastAPI app locally with reload enabled.
- **Generated documentation:** OpenAPI, Swagger UI, and ReDoc are derived from the code.

## 10. Limitations and possible improvements

- Records are stored only in memory and do not survive a server restart.
- There is no database, authentication, authorization, or per-user access control.
- `StudentCreate` requires string fields, but the code does not define additional constraints such as minimum length, maximum length, or allowed branch names.
- The `next_id` counter is process-local and is not designed for persistent or multi-worker storage.
- `requirements.txt` does not pin dependency versions, so installs may resolve different releases over time.
- The sample has no automated tests or separate service/data-access layer.

## 11. Conclusion

Lecture 5 demonstrates how to build a typed JSON API with FastAPI. Pydantic models describe student data, endpoint annotations declare input and output, and FastAPI supplies request validation and automatically generated documentation. The five routes cover listing, filtering, retrieving, creating, replacing, and deleting student records. The in-memory list keeps the example straightforward while showing why a real service needs persistent storage and stronger operational safeguards.
