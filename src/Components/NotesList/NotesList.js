import React from 'react';
import './NotesList.css';
import Note from '../Note/Note';
import AddNote from '../AddNote/AddNote';

export default function NotesList({ notes, handleDeleteNote, handleAddNote, allNotes, setAllNotes }) {
  return (
    <div className='notes-list'>
      {notes.map((note) => {
        return (
          <Note
            key={ note.id }
            id={ note.id }
            subject={ note.subject }
            text={ note.text }
            date={ note.date }
            handleDeleteNote={ handleDeleteNote }
          />
        )
      })}
      <AddNote
        allNotes= { allNotes }
        setAllNotes = { setAllNotes }
      />
    </div>
  );
}
