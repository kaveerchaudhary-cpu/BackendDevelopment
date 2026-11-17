const express = require("express");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

let nextId = 3;
const students = [
  { id: 1, name: "Rahul", course: "BCA" },
  { id: 2, name: "Amit", course: "MCA" }
];

function findStudent(id) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1) {
    return undefined;
  }
  return students.find(student => student.id === numericId);
}

app.get("/", (req, res) => {
  res.send("Welcome to the Student Management API.");
});

app.get("/students", (req, res) => {
  res.status(200).json(students);
});

app.get("/students/:id", (req, res) => {
  const student = findStudent(req.params.id);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.status(200).json(student);
});

app.post("/students", (req, res) => {
  const { name, course } = req.body || {};
  if (typeof name !== "string" || !name.trim() ||
      typeof course !== "string" || !course.trim()) {
    return res.status(400).json({ error: "name and course are required" });
  }

  const student = {
    id: nextId++,
    name: name.trim(),
    course: course.trim()
  };
  students.push(student);
  res.status(201).json(student);
});

app.delete("/students/:id", (req, res) => {
  const student = findStudent(req.params.id);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  students.splice(students.indexOf(student), 1);
  res.status(200).json({ message: "Student deleted", student });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Student Management API listening on port ${PORT}`);
});
