import { db, collection, addDoc, updateDoc, doc, deleteDoc } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () => {
    return async(dispatch, getState) => {
        const uid = getState().auth.uid;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const doc = await addDoc(collection(db, `${ uid }/journal/notes`), newNote);
        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote));
    }
};

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes,
});

export const startSaveNote = (note) => {
    return async(dispatch, getState) => {
        const uid = getState().auth.uid;
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        if (!noteToFirestore.imageUrl) delete noteToFirestore.imageUrl;

        await updateDoc(doc(db, `${ uid }/journal/notes/${ note.id }`), noteToFirestore);
        dispatch(refreshNote(note.id, note));
        Swal.fire('Saved', note.title, 'success');
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note,
    }
});

export const startUploading = (file) => {
    return async(dispatch, getState) => {
        const { active } = getState().notes;
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
        const fileUrl = await fileUpload(file);
        Swal.close();
        active.imageUrl = fileUrl;
        dispatch(activeNote(active.id, active));
    }
}

export const startDeleting = (id) => {
    return async(dispatch, getState) => {
        const uid = getState().auth.uid;
        await deleteDoc(doc(db, `${ uid }/journal/notes/${ id }`));
        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id,
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning,
    payload: null,
});
