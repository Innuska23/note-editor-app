import { formatRelative} from 'date-fns'
import { es} from 'date-fns/locale'

export default class NotesAPI {
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveNote(noteToSave) {
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id);

        // Edit/Update
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    static deleteNote(id){
        const notes = NotesAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id != id);

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}

// const bntDelete = document.querySelector('#btn-delete')
// bntDelete.addEventListener('click', () => {
// console.log(bntDelete);
// });
// const removebntDelete = (fieldName, id) => {
//     try {
//         const list = JSON.parse(localStorage.getItem(fieldName));
//         const result = list.filter((existFilm) => existFilm.id !== id);

//         localStorage.setItem(fieldName, JSON.stringify(result));
//     } catch { }