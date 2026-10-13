# Lecture 4: HTTP, curl, and fetch()

**Course:** Backend Development

**Student:** Kabir Chaudhary

**Roll number:** 590015728

**Project:** Express Student API with a browser-based `fetch()` client

## 1. Lecture overview

Lecture 4 demonstrates the HTTP request/response cycle through a small Express API for student records. It combines a Node.js server, JSON API routes, a static browser client that uses `fetch()`, and command-line requests with `curl`. The examples show how HTTP methods, URL paths, query parameters, JSON bodies, response codes, and response headers work together.

The README distinguishes this project from Lecture 5: Lecture 4 uses Express at `http://localhost:3000`, while Lecture 5 is a separate FastAPI project that uses port `5000`.

## 2. Learning objectives

- Start an Express server and serve static browser files.
- Define REST-style endpoints for reading, creating, updating, and deleting records.
- Use query parameters to filter a collection.
- Use path parameters to select an individual record.
- Parse and validate JSON request bodies.
- Return JSON responses with meaningful HTTP status codes.
- Make asynchronous HTTP requests from browser JavaScript with `fetch()`.
- Submit JSON using the `Content-Type: application/json` header.
- Test API behavior from a terminal with `curl.exe`.
- Inspect request and response information in the browser Network panel.

## 3. Project structure and technologies

- `server.js` configures Express, initial student data, validation, API routes, and server startup.
- `public/index.html` is served as the browser client and contains the form, lists, and JavaScript `fetch()` calls.
- `package.json` defines the `npm start` command and Express dependency.
- `package-lock.json` records the resolved dependency tree.
- `.gitignore` excludes `node_modules/`.

The project uses Node.js, Express 5, HTML, browser JavaScript, JSON, HTTP, and `curl.exe`. There is no database: the student records are stored in an array in the server process.

## 4. Starting the server

From the Lecture 4 project directory, install dependencies and start the server:

```powershell
npm install
npm start
```

The `start` script runs `node server.js`. The server listens on port `3000`. Open `http://localhost:3000` to load the browser client, or call the API routes directly.

## 5. Express middleware and initial data

The server configures two middleware functions:

- `express.json()` parses incoming JSON bodies so POST and PUT handlers can read values from `req.body`.
- `express.static(path.join(__dirname, "public"))` serves files from the `public` directory, including the root `public/index.html`.

The API starts with three in-memory student objects:

| ID | Name | Branch |
|---:|---|---|
| 1 | Aarav | CSE |
| 2 | Diya | ECE |
| 3 | Rohan | IT |

`nextId` starts at `4` so newly created students get the next integer ID. These values exist only in server memory; additions, updates, and deletions are not saved to a database or file and are reset when the server restarts.

## 6. Student input validation

The `validStudent(student)` helper verifies that:

- A student object was supplied.
- `name` is a string and contains a non-whitespace value.
- `branch` is a string and contains a non-whitespace value.

The create and update routes use this helper. They trim the submitted name and branch before storing them. Invalid or missing values result in HTTP 400 and a JSON error explaining that both fields are required.

## 7. API routes

### `GET /students`

Returns the complete student array as JSON with HTTP 200. If a `branch` query parameter is provided, the server returns only students whose branch matches it, ignoring letter case.

Examples:

```text
GET http://localhost:3000/students
GET http://localhost:3000/students?branch=CSE
```

### `GET /students/:id`

Looks up a student by converting the URL's `id` path parameter to a number. A matching student is returned as JSON with HTTP 200. An unknown ID returns HTTP 404 and:

```json
{ "error": "Student not found" }
```

For example, `/students/3` returns Rohan's record, while `/students/99` returns the not-found response.

### `POST /students`

Creates a student from a JSON body containing `name` and `branch`:

```json
{
  "name": "Priya",
  "branch": "CSE"
}
```

The route validates the body, trims both values, assigns the next ID, appends the new student to the in-memory array, and returns the created student as JSON with HTTP 201. Invalid input returns HTTP 400.

### `PUT /students/:id`

Replaces the name and branch values for the student identified by the path parameter. It returns the updated student as JSON with HTTP 200. An unknown ID returns HTTP 404; an invalid body returns HTTP 400.

The implementation updates the existing object in the in-memory array, so subsequent requests in the same server run see the new values.

### `DELETE /students/:id`

Finds the array position of the specified ID and removes the record. A successful delete returns HTTP 204 with an empty response body. An unknown ID returns HTTP 404 with a JSON error.

## 8. Browser client and `fetch()`

`public/index.html` contains a form with required Name and Branch inputs, a submit button, a live message region, and separate lists for all students and CSE students.

When the page loads:

- `loadStudents()` sends `GET /students`, parses the JSON response, clears the current list, and inserts a list item for each student.
- `loadCseStudents()` sends `GET /students?branch=CSE` and displays only CSE students.
- Both functions check `response.ok` and throw an error for unsuccessful HTTP responses.
- Student values are assigned through `textContent`, rather than interpolated as HTML.

When the form is submitted:

1. The submit handler calls `preventDefault()` so the browser does not navigate away or submit a normal HTML form request.
2. It sends `POST /students` with `fetch()`.
3. It sets the `Content-Type` header to `application/json`.
4. It serializes the input values with `JSON.stringify()`.
5. If the response is unsuccessful, it throws an HTTP-status error for the catch block to display.
6. On success, it displays a confirmation message, resets the form, and reloads both student lists with `Promise.all()`.

The client also catches failures while loading the initial lists and displays an error in the `aria-live="polite"` message element.

Because Express serves the client and API from the same origin and port, these requests do not require cross-origin configuration.

## 9. Testing with `curl.exe`

The README uses `curl.exe` in PowerShell to ensure the native curl program is invoked rather than PowerShell's historical `curl` alias. Examples include:

```powershell
curl.exe -v http://localhost:3000/students
curl.exe http://localhost:3000/students/3
curl.exe "http://localhost:3000/students?branch=CSE"
curl.exe http://localhost:3000/students/99
curl.exe -X POST http://localhost:3000/students -H "Content-Type: application/json" -d '{"name":"Priya","branch":"CSE"}'
curl.exe -X PUT http://localhost:3000/students/1 -H "Content-Type: application/json" -d '{"name":"Aarav Sharma","branch":"CSE"}'
curl.exe -i -X DELETE http://localhost:3000/students/2
```

- `-X` specifies the HTTP method.
- `-H` adds a request header; JSON POST and PUT calls need the JSON content type.
- `-d` supplies the request body.
- `-v` displays detailed request and response headers.
- `-i` includes response headers in the output.

These commands make it possible to test the API independently of the browser client.

## 10. HTTP request and response anatomy

An HTTP request line identifies the method, resource path, and protocol version:

```text
GET /students HTTP/1.1
```

An HTTP response begins with the protocol version and a status code/reason phrase:

```text
HTTP/1.1 200 OK
```

For this API, the main status codes are:

- **200 OK:** A read or update completed successfully.
- **201 Created:** A new student was created.
- **204 No Content:** A student was deleted successfully; there is no response body.
- **400 Bad Request:** Required student fields are missing or invalid.
- **404 Not Found:** The requested student ID does not exist.

For POST and PUT, the request body carries the JSON fields. The content type header tells the server how to interpret that body. API responses use JSON for record data and error messages.

## 11. Route summary

| Method | Route | Successful response | Purpose |
|---|---|---|---|
| GET | `/students` | 200 JSON | Return all students. |
| GET | `/students?branch=CSE` | 200 JSON | Filter students by branch, case-insensitively. |
| GET | `/students/:id` | 200 JSON | Return one student; unknown IDs return 404. |
| POST | `/students` | 201 JSON | Validate and create a student. |
| PUT | `/students/:id` | 200 JSON | Validate and update an existing student; unknown IDs return 404. |
| DELETE | `/students/:id` | 204 empty body | Delete an existing student; unknown IDs return 404. |

## 12. Limitations

- Student data is stored only in memory and is lost on server restart.
- There is no database, authentication, authorization, or user ownership.
- Validation checks for non-empty name and branch strings, but does not impose length or domain-specific constraints.
- The `nextId` counter is process-local and is not designed for persistence or multiple server instances.
- The browser client is a demonstration page, not a production-ready interface.

## 13. Conclusion

Lecture 4 demonstrates how an Express API handles the full lifecycle of a resource using GET, POST, PUT, and DELETE. It connects these routes to an HTML client that uses `fetch()` and to terminal-based tests using `curl.exe`. The lecture also explains JSON request bodies, query and path parameters, response status codes, and HTTP request/response structure. Its in-memory data model keeps the example simple while highlighting the need for persistent storage in a real application.
