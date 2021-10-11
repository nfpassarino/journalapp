import { collection, getDocs, db } from "../firebase/firebase-config";

export const loadNotes = async(uid) => {
    const querySnapshot = await getDocs(collection(db, `${ uid }/journal/notes`));
    const notes = [];

    querySnapshot.forEach(child => {
        notes.push({
            id: child.id,
            ...child.data(),
        });
    });

    return notes;
};
