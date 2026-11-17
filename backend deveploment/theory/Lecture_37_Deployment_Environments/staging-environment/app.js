
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to Staging Environment");
});

app.get("/health", (req, res) => {
    res.json({ status: "staging healthy" });
});

app.listen(4000, () => {
    console.log("Staging server running on port 4000");
});
