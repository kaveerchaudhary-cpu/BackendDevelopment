const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'exp12b-todo-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax' }
}));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getTodos(req) {
  if (!Array.isArray(req.session.todos)) req.session.todos = [];
  return req.session.todos;
}

function page(req, message = '') {
  const theme = req.cookies.theme === 'dark' ? 'dark' : 'light';
  const todos = getTodos(req);
  const list = todos.length
    ? todos.map((todo, index) => `
        <li>
          <span>${escapeHtml(todo)}</span>
          <form action="/todos/${index}/delete" method="post">
            <button type="submit" aria-label="Delete ${escapeHtml(todo)}">Delete</button>
          </form>
        </li>`).join('')
    : '<li class="empty">No tasks yet. Add your first task above.</li>';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Session To-Do List</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: Arial, sans-serif; background: #eef2ff; color: #172554; }
    body.dark { color-scheme: dark; background: #111827; color: #f8fafc; }
    main { width: min(92vw, 620px); background: #fff; padding: 2rem; border-radius: 16px; box-shadow: 0 16px 36px #1e3a8a26; }
    .dark main { background: #1f2937; box-shadow: 0 16px 36px #0006; }
    h1 { margin-top: 0; }
    .subtitle, .empty { color: #64748b; }
    .dark .subtitle, .dark .empty { color: #cbd5e1; }
    .add-form { display: flex; gap: .75rem; margin: 1.25rem 0; }
    input { flex: 1; min-width: 0; padding: .75rem; border: 1px solid #94a3b8; border-radius: 8px; font: inherit; }
    button { cursor: pointer; padding: .75rem 1rem; border: 0; border-radius: 8px; background: #2563eb; color: white; font: inherit; font-weight: 700; }
    button:hover { background: #1d4ed8; }
    ul { padding: 0; margin: 0; list-style: none; }
    li { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .8rem 0; border-bottom: 1px solid #cbd5e1; }
    .dark li { border-color: #475569; }
    li span { overflow-wrap: anywhere; }
    li form { margin: 0; }
    li form button { padding: .45rem .75rem; background: #dc2626; }
    li form button:hover { background: #b91c1c; }
    .toolbar { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-top: 1.5rem; }
    .theme-link { color: inherit; font-weight: 700; }
    .message { padding: .75rem; border-radius: 8px; background: #fee2e2; color: #991b1b; }
  </style>
</head>
<body class="${theme}">
  <main>
    <h1>My To-Do List</h1>
    <p class="subtitle">Tasks are saved only in this browser session.</p>
    ${message ? `<p class="message">${escapeHtml(message)}</p>` : ''}
    <form class="add-form" action="/todos" method="post">
      <input name="todoItem" maxlength="200" placeholder="What needs to be done?" autocomplete="off" required>
      <button type="submit">Add task</button>
    </form>
    <ul>${list}</ul>
    <div class="toolbar">
      <strong>${todos.length} task${todos.length === 1 ? '' : 's'}</strong>
      <a class="theme-link" href="/theme">Use ${theme === 'dark' ? 'light' : 'dark'} theme</a>
    </div>
  </main>
</body>
</html>`;
}

app.get('/', (req, res) => res.send(page(req)));

app.post('/todos', (req, res) => {
  const todoItem = typeof req.body.todoItem === 'string' ? req.body.todoItem.trim() : '';
  if (!todoItem) return res.status(400).send(page(req, 'Please enter a task before adding it.'));

  getTodos(req).push(todoItem);
  return res.redirect('/');
});

app.post('/todos/:id/delete', (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const todos = getTodos(req);
  if (Number.isInteger(id) && id >= 0 && id < todos.length) {
    req.session.todos = todos.filter((_, index) => index !== id);
  }
  res.redirect('/');
});

app.get('/theme', (req, res) => {
  const nextTheme = req.cookies.theme === 'dark' ? 'light' : 'dark';
  res.cookie('theme', nextTheme, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    sameSite: 'lax'
  });
  res.redirect('/');
});

app.listen(PORT, () => console.log(`To-do list running at http://localhost:${PORT}`));
