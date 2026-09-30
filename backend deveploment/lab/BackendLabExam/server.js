const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

const mongoURL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoURL);

let notesCollection;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

async function connectDB() {
    try {
        await client.connect();

        const database = client.db("notes_lab");
        notesCollection = database.collection("notes");

        console.log("Connected to MongoDB");

        app.listen(3000, () => {
            console.log("Server running at http://localhost:3000");
        });
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

app.get("/", async (req, res) => {
    try {
        const notes = await notesCollection
            .find()
            .sort({ createdAt: -1 })
            .toArray();

        res.render("index", {
            notes: notes,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving notes");
    }
});

app.get("/notes/new", (req, res) => {
    res.render("new");
});

app.post("/notes", async (req, res) => {
    try {
        const { title, content, category } = req.body;

        if (!title || !title.trim() || !content || !content.trim()) {
            return res.status(400).send("Title and content are required.");
        }

        await notesCollection.insertOne({
            title: title.trim(),
            content: content.trim(),
            category: category ? category.trim() : "General",
            createdAt: new Date(),
        });

        

        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding note");
    }
});

app.post("/notes/:id/delete", async (req, res) => {
    try {
        await notesCollection.deleteOne({
            _id: new ObjectId(req.params.id),
        });

        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting note");
    }
});

connectDB();