const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/about", (req, res) => {
  res.render("about", {
    course: "Backend Development",
    lecturer: "Dr. Prateek Raj Gautam",
  });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001/about");
});