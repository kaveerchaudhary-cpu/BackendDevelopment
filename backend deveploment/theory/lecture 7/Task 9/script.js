function getNotes() {
    const raw = localStorage.getItem("notes");
    return raw ? JSON.parse(raw) : [];
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
    const container = document.getElementById("notesList");
    const notes = getNotes();

    container.innerHTML = notes.map(note => `
        <div class="note-card">
            <div class="note-text">${note.text}</div>

            <div class="note-actions">
                <button onclick="editNote(${note.id})">Edit</button>
                <button onclick="deleteNote(${note.id})">Delete</button>
            </div>
        </div>
    `).join("");
}

function addNote(text) {
    text = text.trim();

    if (!text) {
        alert("Please enter a note.");
        return;
    }

    const notes = getNotes();

    notes.push({
        id: Date.now(),
        text: text,
        createdAt: new Date().toISOString(),
        updatedAt: null
    });

    saveNotes(notes);
    renderNotes();

    document.getElementById("noteInput").value = "";
}

function deleteNote(id) {
    const notes = getNotes().filter(note => note.id !== id);

    saveNotes(notes);
    renderNotes();
}

function editNote(id) {
    const notes = getNotes();
    const note = notes.find(note => note.id === id);

    if (!note) {
        return;
    }

    const newText = prompt("Edit your note:", note.text);

    if (newText === null) {
        return;
    }

    const trimmedText = newText.trim();

    if (!trimmedText) {
        alert("Note cannot be empty.");
        return;
    }

    note.text = trimmedText;
    note.updatedAt = new Date().toISOString();

    saveNotes(notes);
    renderNotes();
}

document.getElementById("addBtn").addEventListener("click", function () {
    const text = document.getElementById("noteInput").value;
    addNote(text);
});

document.getElementById("noteInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addNote(event.target.value);
    }
});

window.addEventListener("load", renderNotes);