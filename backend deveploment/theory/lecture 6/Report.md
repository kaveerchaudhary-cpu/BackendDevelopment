# Lecture 6: Sessions, Cookies, and Query Strings

**Course:** Backend Development

**Project:** Express session and cookie demonstration

## 1. Lecture overview

Lecture 6 demonstrates three ways HTTP requests can carry state or input in a Node.js and Express application:

- **Sessions** store user-related state on the server and associate it with a browser using a session cookie.
- **Cookies** store small values in the browser and send them back to the server on later requests.
- **Query strings** pass values in a URL, where Express exposes them through `req.query`.

The project uses Express 5, `express-session`, and `cookie-parser`. The server listens on port `3000` and returns short text responses for each demonstration route.

## 2. Project structure and setup

- `app.js` configures Express middleware, defines the session, cookie, and query-string routes, and starts the server.
- `package.json` declares the dependencies and identifies `app.js` as the entry point.
- `package-lock.json` records the resolved npm dependencies.
- `lecture 6 sc/` contains screenshots of the server and route demonstrations.

From the Lecture 6 folder, install dependencies and start the application:

```powershell
npm install
node app.js
```

The project does not define an `npm start` script, so run `node app.js` directly. Once the terminal reports that the server is running, use `http://localhost:3000` followed by one of the paths described below.

![Express server started on port 3000](lecture%206%20sc/Server_Running.png)

Additional terminal captures show the server running in subsequent sessions:

![Express server running in another terminal capture](lecture%206%20sc/Server_Running2.png)

![Express server running in a further terminal capture](lecture%206%20sc/Server_Running3.png)

## 3. Middleware and session configuration

The application registers `express-session` with these options:

- `secret: 'mySecretKey'` signs the session identifier cookie.
- `resave: false` avoids saving an unchanged session on every request.
- `saveUninitialized: true` allows a new, otherwise-unmodified session to be saved.
- `cookie.maxAge: 60000` sets the session cookie lifetime to 60 seconds.

The app also registers `cookie-parser`, which parses incoming cookies and exposes them as `req.cookies`. The session middleware handles its own session cookie; `cookie-parser` is used by the custom `username` cookie routes.

## 4. Session routes

### Start a session — `GET /login`

The route assigns the fixed username `JohnDoe` to `req.session.username`. Express-session associates that server-side session with the browser by setting a session cookie, and the response confirms that the session started.

Open:

```text
http://localhost:3000/login
```

![Login route confirms a session for JohnDoe](lecture%206%20sc/Login_Session.png)

### Check the session — `GET /profile`

The route checks for `req.session.username`. If it exists, the response welcomes that user; otherwise, the response says `Please log in first.` This demonstrates how the browser's session cookie lets the server find the session again on a later request.

Open:

```text
http://localhost:3000/profile
```

The provided `Profile_Session.png` screenshot currently displays `Please log in first.`, meaning that screenshot captured a request without an active session. The route's logged-in response is the welcome message described above.

![Profile route displaying the signed-out response](lecture%206%20sc/Profile_Session.png)

### Destroy a session — `GET /logout`

The route calls `req.session.destroy()`. On an error it responds with `Error destroying session`; when destruction succeeds it responds with `Session destroyed successfully`. After logging out, requesting `/profile` again should produce the signed-out message.

Open:

```text
http://localhost:3000/logout
```

![Logout route confirms that the session was destroyed](lecture%206%20sc/Logout_Session_Destroyed.png)

![Profile route after logout asks the user to log in](lecture%206%20sc/Profile_After_Logout.png)

## 5. Custom cookie routes

### Set a cookie — `GET /setcookie`

The handler sends a cookie named `username` with the value `JohnDoe`. Its options set a one-hour lifetime (`maxAge: 3600000` milliseconds), mark it `httpOnly`, and set `secure` to `false` for the local HTTP demonstration.

Open:

```text
http://localhost:3000/setcookie
```

![Set-cookie route confirmation](lecture%206%20sc/Set_Cookie.png)

### Read a cookie — `GET /getcookie`

`cookie-parser` makes the parsed cookie available through `req.cookies.username`. If the value exists, the route responds with `Welcome back, JohnDoe`; otherwise, it responds with `No cookie found.`

Open:

```text
http://localhost:3000/getcookie
```

![Cookie read route greeting the returning user](lecture%206%20sc/Get_Cookie.png)

The verification screenshot shows the alternative response when the browser does not send a `username` cookie:

![Cookie verification when no username cookie is present](lecture%206%20sc/Cookie_Verification.png)

### Delete a cookie — `GET /deletecookie`

The handler calls `res.clearCookie('username')` and confirms the deletion. A later request to `/getcookie` should then report that no cookie was found.

Open:

```text
http://localhost:3000/deletecookie
```

![Delete-cookie route confirmation](lecture%206%20sc/Delete_Cookie.png)

## 6. Query-string route

The `GET /welcome` route reads `user` and `role` from `req.query` and includes them in its response. For example:

```text
http://localhost:3000/welcome?user=Alice&role=admin
```

The response is:

```text
Welcome Alice, your role is admin
```

![Welcome route reading user and role from the query string](lecture%206%20sc/Query_String.png)

Query strings are useful for simple URL parameters such as filters and display options. They are visible in the URL and should not be used to transmit passwords or other secrets.

## 7. Route summary

| Method | Route | Demonstration |
|---|---|---|
| GET | `/login` | Set `username` in the server-side session. |
| GET | `/profile` | Read the session username or show the signed-out message. |
| GET | `/logout` | Destroy the current session. |
| GET | `/setcookie` | Set a one-hour `username` cookie. |
| GET | `/getcookie` | Read and display the `username` cookie, if present. |
| GET | `/deletecookie` | Clear the `username` cookie. |
| GET | `/welcome?user=...&role=...` | Read `user` and `role` query parameters. |

## 8. Session versus cookie

| Feature | Session in this project | Custom cookie in this project |
|---|---|---|
| Main value | `username` is stored in `req.session`. | `username=JohnDoe` is sent as a cookie value. |
| Where state is kept | Session data is managed server-side by `express-session`. | The browser stores the cookie and sends it with matching requests. |
| How it is accessed | `req.session.username` | `req.cookies.username` |
| Lifetime shown | Session cookie `maxAge` is 60 seconds. | Custom cookie `maxAge` is 3,600,000 milliseconds (one hour). |
| How it is removed | Destroy the session with `req.session.destroy()`. | Clear the cookie with `res.clearCookie('username')`. |

The session cookie typically carries a session identifier rather than the session's application data. The server uses that identifier to associate requests with session state.

## 9. Important security and production limitations

- **Hard-coded session secret:** `'mySecretKey'` is suitable only as a demonstration value. A real application must load a strong secret from protected configuration and rotate it appropriately.
- **Default session storage:** `express-session`'s default in-memory store is not intended for production, does not persist across restarts, and is unsuitable for multi-process deployments. A production service should use a persistent session store.
- **No real authentication:** `/login` assigns a fixed username without checking credentials. The sample demonstrates session state, not a secure login system.
- **GET requests change state:** `/login`, `/logout`, `/setcookie`, and `/deletecookie` mutate application state through GET routes. Production applications should use appropriate non-GET methods and consider CSRF protections.
- **Cookie transport settings:** The custom cookie explicitly sets `secure: false`, which is appropriate only for the local HTTP example. Production deployments should use HTTPS and secure cookie settings; cookie scope and `sameSite` policy should also be configured deliberately.
- **Cookie values are not trusted identity:** A client-provided cookie must not by itself be treated as proof of authentication. In this example the `username` cookie is only a teaching demonstration.
- **Query values are interpolated into a response:** The `/welcome` route inserts query-string values directly into response text. If the output becomes HTML, it must be safely escaped to prevent cross-site scripting.
- **Session lifetime and cleanup:** The configured session cookie is short-lived, but production expiry, storage cleanup, and session renewal should be planned explicitly.

## 10. Conclusion

Lecture 6 compares server-managed sessions with browser cookies and demonstrates how Express reads query-string parameters. The routes provide a simple sequence for starting, checking, and destroying a session; setting, reading, and deleting a custom cookie; and forming a response from URL parameters. Together with the screenshots, the project shows how browser state is carried across HTTP requests and why production applications need secure configuration, proper authentication, and persistent session storage.
