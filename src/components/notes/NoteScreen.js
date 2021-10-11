import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(active);
    const { body, title, imageUrl } = formValues;
    const activeId = useRef(active.id);
    useEffect(() => {
        if(active.id !== activeId.current) {
            reset(active);
            activeId.current = active.id;
        } else if (active.imageUrl !== imageUrl) {
            reset(active);
        }
    }, [active, reset, imageUrl]);

    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }));
    }, [dispatch, formValues]);

    const handleDelete = () => {
        dispatch(startDeleting(active.id));
    }

    return (
        <div className="notes__main-container animate__animated animate__fadeIn">
            <NotesAppBar />
            <div className='notes__content'>
                <input
                    title="text"
                    placeholder="some awesome title"
                    className="notes__title-input"
                    autoComplete='off'
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                />
                <textarea
                    placeholder="helloo"
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>
                {
                    imageUrl && 
                    <div className="notes__image">
                        <img
                            src={ imageUrl }
                            alt="Note"
                        />
                    </div>
                }
            </div>
            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>
        </div>
    )
}
