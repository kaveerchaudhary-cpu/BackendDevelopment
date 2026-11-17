
const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Welcome to Local Environment");
});

app.get("/health", (req, res) => {
    res.json({ status: "healthy" });
});

app.listen(port, () => {
    console.log("Local server running on port " + port);
});
