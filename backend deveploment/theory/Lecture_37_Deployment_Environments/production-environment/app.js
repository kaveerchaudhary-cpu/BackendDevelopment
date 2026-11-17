
const express = require("express");

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to Production Environment");
});

app.get("/health", (req, res) => {
    res.json({ status: "production healthy" });
});

app.listen(port, () => {
    console.log("Production server running on port " + port);
});
