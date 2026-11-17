const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const students = [
  { id: 1, name: "Aarav", course: "Backend Development" },
  { id: 2, name: "Diya", course: "Backend Development" }
];

app.get("/", (req, res) => {
  res.json({
    application: "Student API",
    framework: "Express",
    status: "running"
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.listen(port, "0.0.0.0", () => {
  console.log("Express API listening on port " + port);
});
