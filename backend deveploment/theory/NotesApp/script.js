function getNotes() {
    const raw = localStorage.getItem("notes");
    return raw ? JSON.parse(raw) : [];
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote(text) {
    if (text.trim() === "") {
        alert("Please enter a note.");
        return;
    }

    const notes = getNotes();

    notes.push({
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: null,
    });

    saveNotes(notes);
    renderNotes();

    document.getElementById("noteInput").value = "";
}

function renderNotes() {
    const container = document.getElementById("notesList");
    const notes = getNotes();

    container.innerHTML = notes.map((note) => `
        <div class="note-card">
            <p>${note.text}</p>
            <p>Created: ${note.createdAt}</p>
            <p>Updated: ${note.updatedAt || "Not updated"}</p>

            <button onclick="editNote(${note.id})">
                Edit
            </button>

            <button onclick="deleteNote(${note.id})">
                Delete
            </button>
        </div>
    `).join("");
}

function editNote(id) {
    const notes = getNotes();
    const note = notes.find((n) => n.id === id);

    if (note) {
        const newText = prompt("Edit your note:", note.text);

        if (newText !== null && newText.trim() !== "") {
            note.text = newText;
            note.updatedAt = new Date().toISOString();

            saveNotes(notes);
            renderNotes();
        }
    }
}

function deleteNote(id) {
    const notes = getNotes().filter((note) => note.id !== id);

    saveNotes(notes);
    renderNotes();
}

window.onload = renderNotes;