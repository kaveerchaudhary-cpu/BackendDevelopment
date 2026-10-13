# Experiment 12B: Session-Based To-Do List

**Course:** Backend Development

**Student:** Kabir Chaudhary

**Roll number:** 590015728

**Experiment:** Build a browser-based to-do list with Express sessions

**Application entry point:** `source/server.js`

## 1. Aim

To create a server-rendered to-do application with Node.js and Express, keep each user's task list in a browser session, support adding and deleting tasks, and remember the selected light or dark theme with a cookie.

## 2. Learning objectives

- Create a web server with Express and define GET and POST routes.
- Parse URL-encoded form submissions.
- Store per-session application data with `express-session`.
- Read and set browser cookies with `cookie-parser` and Express response helpers.
- Validate and normalize submitted form values on the server.
- Escape user-provided text before inserting it into generated HTML.
- Return appropriate responses and redirect after successful form actions.
- Use CSS to create responsive layout, interactive controls, and light/dark themes.

## 3. Technologies and dependencies

- **Node.js:** Runs the server-side JavaScript application.
- **Express 5:** Handles HTTP requests, routes, middleware, responses, and redirects.
- **express-session:** Creates and reads the session associated with a browser's session cookie.
- **cookie-parser:** Parses incoming cookies so the app can read the saved theme.
- **HTML:** Defines the server-generated page and its forms and controls.
- **CSS:** Styles the application, including the light and dark appearances.
- **npm:** Installs dependencies and runs the project scripts.

The dependencies and scripts are declared in `package.json`; `package-lock.json` records the resolved dependency tree.

## 4. Project structure and startup

- `source/server.js` contains the Express configuration, helper functions, page markup, routes, and server startup.
- `package.json` defines the project scripts:
  - `npm start` runs `node source/server.js`.
  - `npm run dev` runs the server with Node's `--watch` option.
- `package-lock.json` records the installed dependency versions.
- `EXP12 sc/` contains earlier development screenshots.
- `to do list/Screenshot 2026-08-30 130938.png` shows the current to-do list interface and is embedded below.

From the `Exp 12B` project directory, install dependencies with `npm install`, then start the app with `npm start` or `npm run dev`. The server uses `process.env.PORT` when set and otherwise listens on port `3000`. Open `http://localhost:3000` in a browser.

## 5. Middleware and session configuration

The server registers these middleware functions:

- `cookieParser()` parses the incoming `Cookie` header and makes cookie values available through `req.cookies`.
- `express.urlencoded({ extended: true })` parses URL-encoded form bodies and makes submitted fields available through `req.body`.
- `express-session(...)` associates each browser with session data and makes it available through `req.session`.

Session configuration uses:

- A secret from the `SESSION_SECRET` environment variable, with a development fallback defined in the source.
- `resave: false`, so an unchanged session is not needlessly saved again.
- `saveUninitialized: false`, so an empty session is not saved before it is needed.
- An `httpOnly` session cookie, which is not readable by browser-side JavaScript.
- `sameSite: 'lax'` for the session cookie.

The default Express session store is in-memory. Task data is therefore temporary: it is isolated by browser session but is not stored in a database and may be lost when the server restarts. For a deployed production service, configure a strong secret through `SESSION_SECRET` and use a persistent session store.

## 6. HTML generation and escaping

The `page(req, message)` helper generates the complete HTML document as a string and sends it from the route handlers. It does not use a separate template engine.

Before task text or an optional status message is inserted into the generated HTML, `escapeHtml(value)` converts the value to a string and escapes ampersands, angle brackets, quotation marks, and apostrophes. This ensures user-provided text is displayed as text rather than interpreted as HTML markup.

The page helper also:

- Selects the current theme from the `theme` cookie.
- Retrieves the current session's tasks using `getTodos(req)`.
- Displays an empty-state message when the session has no tasks.
- Generates one list row and a delete form for each task.
- Displays the number of tasks with singular/plural wording.

## 7. Task-list session data

`getTodos(req)` ensures `req.session.todos` is an array and returns it. Each browser session gets its own task array, so separate browser sessions do not share task lists. Tasks are plain strings and do not have separate IDs; their current array positions are used when generating delete routes.

The page states that tasks are saved only in the browser session. This describes the app's session-scoped behavior, not permanent storage: tasks are not saved to a database or file.

## 8. Routes and behavior

### `GET /`

Renders the to-do interface for the current session. It shows the task input, Add button, task list or empty state, task count, and theme-switch link. If a status message is supplied by a form handler, the message is escaped and displayed.

### `POST /todos`

Processes the add-task form:

1. Reads `todoItem` from the URL-encoded request body.
2. Accepts it only if it is a string, then trims surrounding whitespace.
3. Returns HTTP 400 and displays an error message if the resulting value is empty.
4. Otherwise, appends the task to the current session's task array and redirects to `/`.

The form uses the HTML `required` attribute and `maxlength="200"` to guide browser input. The route itself checks that the value is a non-empty string, but does not enforce the 200-character maximum server-side.

### `POST /todos/:id/delete`

Deletes the task at the given array position for the current session. The route parses the `id` parameter as an integer and checks that it is a valid position within the task array. If valid, it filters that position out of the session's tasks. It then redirects to `/`.

Each task has its own HTML form with a delete button. The button's `aria-label` includes the escaped task text to identify which task will be deleted.

### `GET /theme`

Reads the current theme cookie, switches between `light` and `dark`, sets the new cookie, and redirects to `/`. The theme cookie:

- Is marked `httpOnly` and `sameSite: 'lax'`.
- Is configured to expire after 30 days.
- Is read by the server when the next page is generated.

The selected theme is stored separately from task data: the theme is remembered by a cookie, while tasks are held in the Express session.

## 9. User interface and CSS

The page is generated with:

- A semantic HTML document and viewport metadata for mobile-sized screens.
- A centered main card with the to-do heading and a note explaining session-only task storage.
- A form with a text field and Add task button.
- A list of current tasks, each paired with a Delete button.
- An empty-state message when the list contains no tasks.
- A task count and a link to change the theme.

The embedded CSS uses:

- `box-sizing: border-box` globally for predictable element sizing.
- A grid-centered page layout and a card width capped at `620px` while adapting to narrow screens.
- Different background, text, card, and border colors for light and dark themes.
- Flexible form controls so the task input can shrink on smaller screens.
- Spacing, rounded corners, and shadows to distinguish the main card and controls.
- Hover states for the Add and Delete buttons.
- `overflow-wrap: anywhere` so long task text can wrap instead of overflowing.

The selected theme is applied by adding the `dark` class to the page's `<body>` element when the cookie value is `dark`.

## 10. Screenshot

The following screenshot is the existing capture of the current to-do list interface:

![Exp 12B session-based to-do list showing the empty state and light theme](to%20do%20list/Screenshot%202026-08-30%20130938.png)

## 11. Current scope and limitations

- The session store is in memory and is not persistent across server restarts.
- The app does not use a database or file storage.
- The 200-character task limit is specified on the HTML input but is not independently enforced by the POST route.
- There is no authentication or account system; a session distinguishes browser sessions but does not establish a verified user identity.
- The development fallback for `SESSION_SECRET` should be replaced by a strong environment-provided secret in production.
- The older images in `EXP12 sc/` are development captures; the screenshot embedded above is the to-do interface capture.

## 12. Conclusion

Experiment 12B demonstrates a complete small Express application with server-generated HTML, URL-encoded form handling, session-scoped task data, task addition and deletion, cookie-based theme selection, validation, escaping, redirects, and responsive styling. It also illustrates the limits of an in-memory session store and the additional configuration needed for durable, production deployment.
