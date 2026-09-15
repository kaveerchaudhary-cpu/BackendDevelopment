const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB_URL = "mongodb://localhost:27017/userdb";

mongoose.connect(DB_URL)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send(`
    <h1>User Management System</h1>

    <h2>Register</h2>
    <form action="/signup" method="POST">
      <input type="text" name="username" placeholder="Username" required>
      <input type="email" name="email" placeholder="Email" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Sign Up</button>
    </form>

    <h2>Login</h2>
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>

    <h2>View Users</h2>
    <a href="/users">View All Users</a>
  `);
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.send(`
      <h2>Registration successful!</h2>
      <a href="/">Back to Home</a>
    `);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send(`
        <h2>Username or email already exists.</h2>
        <a href="/">Try Again</a>
      `);
    } else {
      res.status(500).send(`
        <h2>Registration failed.</h2>
        <a href="/">Try Again</a>
      `);
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send(`
        <h2>User not found.</h2>
        <a href="/">Try Again</a>
      `);
    }

    if (user.password !== password) {
      return res.status(401).send(`
        <h2>Incorrect password.</h2>
        <a href="/">Try Again</a>
      `);
    }

    res.send(`
      <h2>Login successful! Welcome, ${user.username}</h2>
      <a href="/">Back to Home</a>
    `);
  } catch (err) {
    res.status(500).send(`
      <h2>Login failed.</h2>
      <a href="/">Try Again</a>
    `);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    let html = `
      <h1>All Users</h1>
      <table border="1" cellpadding="10">
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Created At</th>
        </tr>
    `;

    users.forEach((user) => {
      html += `
        <tr>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.createdAt}</td>
        </tr>
      `;
    });

    html += `
      </table>
      <br>
      <a href="/">Back to Home</a>
    `;

    res.send(html);
  } catch (err) {
    res.status(500).send("Failed to retrieve users.");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});