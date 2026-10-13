# Experiment 12: Server-Side Scripting with Node.js

**Course:** Backend Development

**Student:** Kabir Chaudhary

**Roll number:** 590015728

**Experiment:** Programs to familiarize server-side scripting using Node.js

**Application directory:** `parta/`

## 1. Aim

To build and study a server-side web application using Node.js and Express. The application demonstrates HTTP routes, text/HTML/JSON responses, query-string input, basic validation, in-memory student data, and EJS-based page rendering and form handling.

## 2. Learning objectives

- Understand how a Node.js program starts an HTTP server.
- Define GET and POST routes using Express.
- Read query parameters and request-body values.
- Return plain text, HTML, and JSON responses with appropriate HTTP status codes.
- Perform basic input checks and handle invalid requests.
- Use arrays and objects as temporary in-memory application data.
- Configure EJS as an Express view engine.
- Use npm scripts and Nodemon during development.

## 3. Tools and technologies

- **Node.js:** JavaScript runtime used to run the server outside a browser.
- **Express.js:** Web framework used to configure middleware, routes, request handling, and responses.
- **EJS:** Declared as the view engine for rendering server-generated pages.
- **npm:** Installs the project's dependencies and runs its scripts.
- **Nodemon:** Development tool configured to restart the server when watched files change.
- **HTTP:** Request/response protocol used by the routes.
- **JSON:** Format used for structured API responses and request bodies.

The project manifest is `parta/package.json`; `parta/package-lock.json` records the resolved dependency versions. The declared runtime dependencies are Express and EJS, and the development dependency is Nodemon.

## 4. Project files

- `parta/app.js` configures Express, middleware, sample data, routes, the EJS view engine, and the server listener.
- `parta/index.html` is a static lab information page listing run commands, tasks, routes, and the local server URL. It is not served by `app.js`, because the application does not configure static-file middleware.
- `parta/script.js` is a separate Node.js console exercise that logs a greeting and calculates the sum of an array. It is not imported by `app.js` and runs using the `npm run script` command.
- `parta/nodemon.json` configures Nodemon's watched file extensions, paths, ignored dependencies, and restart delay.
- `parta/package.json` defines metadata, dependencies, and npm scripts.
- `parta/package-lock.json` records the dependency tree used by npm.
- `sceernshot/Screenshot 2026-09-22 103636.png` is the screenshot included below.

## 5. Server setup and middleware

In `app.js`, the application imports Express, creates an Express app, and sets the port to `3000`. The following middleware is registered:

- `express.json()` parses JSON request bodies and makes parsed data available through `req.body`.
- `express.urlencoded({ extended: true })` parses URL-encoded form submissions and makes their fields available through `req.body`.

The app sets EJS as its view engine and configures `./views` as the views directory. The server starts with `app.listen(PORT, ...)` and logs `http://localhost:3000` when it is ready.

## 6. Task 1: Basic server and response formats

The student information object contains a name, roll number, and branch. Three GET routes demonstrate different response formats:

- `GET /name/text` sends a plain-text response containing the student's name.
- `GET /name/html` sends HTML containing a heading and paragraphs for the name, roll number, and branch.
- `GET /name/json` sends the complete student information object as JSON.

This demonstrates that the same server can respond with different content formats according to the route.

## 7. Task 2: Calculator API

`GET /calculate` reads `num1`, `num2`, and `operation` from the query string. The numeric values are parsed as floating-point numbers. Supported operations are:

- `add`: addition.
- `subtract`: subtraction.
- `multiply`: multiplication.
- `divide`: division, provided the second number is not zero.
- `modulus`: remainder, provided the second number is not zero.
- `power`: exponentiation.

For a successful request, the route returns JSON containing both parsed operands, the operation, and the result. It returns HTTP 400 with a JSON error when either operand is invalid, when division or modulus would use zero as the divisor, or when the operation is unsupported. For an unsupported operation, the response also lists the allowed operations.

Example:

```text
http://localhost:3000/calculate?num1=10&num2=5&operation=add
```

Expected JSON result:

```json
{
  "num1": 10,
  "num2": 5,
  "operation": "add",
  "result": 15
}
```

## 8. Task 3: Student management routes

The `students` array in `app.js` contains three sample student records. Each record has an ID, name, email, course, and semester. These routes operate on that array:

- `GET /students` returns all current student records as JSON.
- `GET /students/:id` converts the route parameter to a number and searches for a matching ID. It returns the student as JSON or HTTP 404 with a `Student not found` message.
- `POST /students/add` reads `name`, `email`, `course`, and `semester` from the parsed request body. If any value is missing, it returns HTTP 400. Otherwise, it creates a record, appends it to the array, and returns HTTP 201 with a success message and the new record.

The array is held only in server memory. Added students are temporary and are lost when the server process restarts; no database or file persistence is configured.

## 9. Task 4: EJS timetable

The timetable data is represented as an array of weekday records. Each record contains a day, time range, subject, and faculty member. `GET /timetable` passes that array to `res.render('timetable', { timetable })`, demonstrating how server-side data can be supplied to an EJS view.

**Current project limitation:** The tracked Exp 12 files do not include a `views/` directory or a `timetable.ejs` template. As a result, the route is defined, but requesting it will fail when Express cannot find the view. The EJS template must be added under `parta/views/` for this page to render.

## 10. Task 5: Registration form handling

- `GET /register` attempts to render the `register` EJS view.
- `POST /register` reads `name`, `email`, `course`, and `semester` from the parsed request body, then passes those fields as a `student` object to the `result` EJS view.

**Current project limitation:** The tracked project does not contain `views/register.ejs` or `views/result.ejs`, so neither registration route can render successfully until those templates are added. The POST route also does not validate the submitted fields or save the registration; it only passes the received values to the result view.

## 11. Root route and project commands

- `GET /` responds with the plain-text message `Express Lab App is running`.
- `npm start` runs `node app.js`.
- `npm run dev` runs the app using Nodemon.
- `npm run script` runs the separate console example in `script.js`.
- `npm install` installs the dependencies declared in the package manifest.

After starting the server with `npm run dev` or `npm start`, the root URL is `http://localhost:3000`. The API routes can be visited directly or tested with an HTTP client. The student-add endpoint requires a POST request with the four required fields in a JSON or URL-encoded body.

## 12. Data and implementation notes

- Student details and the timetable are hard-coded JavaScript arrays/objects in `app.js`.
- The calculator uses JavaScript number parsing and arithmetic operators.
- Route handlers use Express request objects (`req.query`, `req.params`, and `req.body`) to read input.
- Route handlers use response helpers such as `res.send()`, `res.json()`, `res.render()`, and `res.status()`.
- The app has no database connection, authentication, session handling, or persistent storage.
- `index.html` documents the tasks and example routes, but the Node server does not currently expose it as a static page.
- Nodemon is configured to watch JavaScript, JSON, and EJS files and the `views` directory, while ignoring `node_modules`.

## 13. Expected outcome

When the server is running, the root and API routes respond locally on port 3000. The name endpoints demonstrate text, HTML, and JSON output; the calculator returns arithmetic results or validation errors; and the student endpoints return or modify in-memory records. The timetable and registration routes demonstrate the intended EJS rendering flow, but require their missing view templates before they can display pages.

## 14. Conclusion

Experiment 12 demonstrates core server-side scripting concepts with Node.js and Express, including route creation, request parsing, response formats, query and body parameters, validation, status codes, and temporary application data. It also introduces the EJS view-rendering pattern. The source contains the timetable and registration route handlers, but completing their user-facing pages requires adding the EJS templates to the configured views directory.

## Screenshot

![Exp 12 application running](sceernshot/Screenshot%202026-09-22%20103636.png)
