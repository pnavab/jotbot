import React from 'react';
import './NotesList.css';
import Note from '../Note/Note';

export default function NotesList({ allNotes, handleDeleteNote }) {
  return (
    <div className='notes-list'>
      {allNotes.map((note) => {
        return (
          <Note
            key={ note._id }
            subject={ note.subject }
            text={ note.text }
            date={ note.date }
            handleDeleteNote={ handleDeleteNote }
            id={ note._id }
          />
        )
      })}
    </div>
  );
}
