import React, { useState } from 'react';
import './Note.css';
import { pencilSymbol, trashcanSymbol } from './SVG';

export default function Note({ subject, text, date, handleDeleteNote, id, setAllNotes }) {
  const [noteSubject, setNoteSubject] = useState(subject);
  const [noteText, setNoteText] = useState(text);

  return (
    <div className='note'>
      <textarea
        className='subject-area'
        rows='1'
        cols='10'
        placeholder='No Subject'
        value={ noteSubject }
        onChange={e => setNoteSubject(e.target.value)}
        >
      </textarea>
      <textarea
        className='note-area'
        rows='8'
        cols='10'
        placeholder='Click here to add note'
        value={ noteText }
        onChange={e => setNoteText(e.target.value)}
      >
      </textarea>
      <div className='note-footer'>
        <small>{ date }</small>
        <div className='buttons'>
          <button
            className='edit-note-button'
          >
          { pencilSymbol() }
          </button>
          <button
            className='delete-note-button'
            onClick={() => {handleDeleteNote(id)}}
          >
          { trashcanSymbol() }
          </button>
        </div>
      </div>
    </div>
  );
}
