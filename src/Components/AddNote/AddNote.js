import React, { useState } from 'react';
import './AddNote.css';
import { createNote } from '../../APIFunctions/Note';

export default function AddNote({ allNotes, setAllNotes }) {
  const [noteSubject, setNoteSubject] = useState();
  const [noteText, setNoteText] = useState();

  async function handleSaveClick() {
    const response = await createNote(noteSubject, noteText);
    console.log(response);
    if(response.error) {
      console.log('adding a note had an error when submitting');
    } else {
      setAllNotes([...allNotes, response]);
    }
  }

  return (
    <div className='note new'>
      <textarea
        className='subject-area'
        id='subject-area'
        rows='1'
        cols='10'
        placeholder='Subject'
        onChange={e => {setNoteSubject(e.target.value)}}
        >
      </textarea>
      <textarea
        className='note-area'
        id='note-area'
        rows='8'
        cols='10'
        placeholder='Click here to add note'
        onChange={e => {setNoteText(e.target.value)}}
      >
      </textarea>
      <div className='note-footer'>
        <small>200 Remaining</small>
        <button className='save-button'onClick={() => handleSaveClick()}>Save</button>
      </div>
    </div>
  );
}
