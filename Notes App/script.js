const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById('notesContainer');

function saveNotes(){
    const notes = document.querySelectorAll("textarea");
    const data = [];
    notes.forEach( note => data.push(note.value));
    localStorage.setItem("notes", JSON.stringify(data));
}

function createNote( content = ""){
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.addEventListener("input", saveNotes);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className  = "deleteBtn";
    deleteBtn.addEventListener("click", () => {
        noteDiv.remove();
        saveNotes();
    });
    noteDiv.appendChild(deleteBtn);
    noteDiv.appendChild(textarea);
    notesContainer.append(noteDiv);
}

addNoteBtn.addEventListener("click", () => createNote());

(function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.forEach(note => createNote(note));
})();