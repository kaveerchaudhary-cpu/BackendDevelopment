const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let nextId = 4;
const students = [
  { id: 1, name: "Aarav", branch: "CSE" },
  { id: 2, name: "Diya", branch: "ECE" },
  { id: 3, name: "Rohan", branch: "IT" }
];

function validStudent(student) {
  return (
    student &&
    typeof student.name === "string" &&
    student.name.trim() &&
    typeof student.branch === "string" &&
    student.branch.trim()
  );
}

app.get("/students", (req, res) => {
  const { branch } = req.query;
  const result = branch
    ? students.filter(student => student.branch.toUpperCase() === branch.toUpperCase())
    : students;

  res.status(200).json(result);
});

app.get("/students/:id", (req, res) => {
  const student = students.find(item => item.id === Number(req.params.id));

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.status(200).json(student);
});

app.post("/students", (req, res) => {
  if (!validStudent(req.body)) {
    return res.status(400).json({ error: "name and branch are required" });
  }

  const newStudent = {
    id: nextId++,
    name: req.body.name.trim(),
    branch: req.body.branch.trim()
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put("/students/:id", (req, res) => {
  const student = students.find(item => item.id === Number(req.params.id));

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  if (!validStudent(req.body)) {
    return res.status(400).json({ error: "name and branch are required" });
  }

  student.name = req.body.name.trim();
  student.branch = req.body.branch.trim();
  res.status(200).json(student);
});

app.delete("/students/:id", (req, res) => {
  const index = students.findIndex(item => item.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Student API running at http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT} for the fetch() client.`);
});
