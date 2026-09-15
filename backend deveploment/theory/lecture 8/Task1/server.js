const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const students = [
  { id: 1, name: 'Aarav', branch: 'CSE' },
  { id: 2, name: 'Diya', branch: 'ECE' },
  { id: 3, name: 'Rohan', branch: 'IT' },
  { id: 4, name: 'Ananya', branch: 'CSE' }
];

app.get('/', (req, res) => {
  res.render('students', { students });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});