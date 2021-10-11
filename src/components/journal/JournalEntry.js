import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, title, body, date, imageUrl }) => {
    const noteDate = moment(date);
    const dispatch = useDispatch();
    const handleActive = () => {
        dispatch(activeNote(id, { date, title, body, imageUrl }));
    };

    return (
        <div
            className="journal__entry animate__animated animate__fadeIn"
            onClick={ handleActive }
        >
            {
                imageUrl &&
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${ imageUrl })`,
                    }}
                ></div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('DD') }</h4>
            </div>
        </div>
    )
}
