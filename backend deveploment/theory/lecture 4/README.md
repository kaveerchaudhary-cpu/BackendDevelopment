# Lecture 4 — HTTP, curl, and fetch()

This project demonstrates an HTTP request/response cycle using an Express Student API.

## 1. Start the server

Open a terminal in this folder and run:

```powershell
npm install
npm start
```

The server listens at `http://localhost:3000`.

## 2. Try the browser fetch() client

Open `http://localhost:3000` in a browser. The page uses `fetch()` to load students and to create a student with `POST /students`.

Open Developer Tools with `F12`, select **Network**, reload the page, and inspect the `GET /students` request. You can see its headers, status (`200 OK`), and JSON response.

## 3. API routes

| Method | Route | Successful response |
| --- | --- | --- |
| GET | `/students` | `200 OK` |
| GET | `/students?branch=CSE` | `200 OK` |
| GET | `/students/1` | `200 OK` |
| POST | `/students` | `201 Created` |
| PUT | `/students/1` | `200 OK` |
| DELETE | `/students/1` | `204 No Content` |

An unknown ID such as `/students/99` returns `404 Not Found`.

## 4. Test with curl

In PowerShell, use `curl.exe` so that the real curl program is used:

```powershell
curl.exe -v http://localhost:3000/students
curl.exe http://localhost:3000/students/1
curl.exe http://localhost:3000/students/99
curl.exe -X POST http://localhost:3000/students -H "Content-Type: application/json" -d '{"name":"Priya","branch":"CSE"}'
curl.exe -X PUT http://localhost:3000/students/1 -H "Content-Type: application/json" -d '{"name":"Aarav Sharma","branch":"CSE"}'
curl.exe -i -X DELETE http://localhost:3000/students/2
```

`-v` shows request and response headers. `-i` includes response headers in the output.

## 5. HTTP anatomy

A request begins with a method, path, and version:

```text
GET /students HTTP/1.1
```

A response begins with its version and status:

```text
HTTP/1.1 200 OK
```

The request body is used by `POST` and `PUT`; here it is JSON containing `name` and `branch`.
