import React, { useState } from 'react';
import './AddNote.css';

export default function AddNote({ handleAddNote }) {
  const [noteSubject, setNoteSubject] = useState();
  const [noteText, setNoteText] = useState();

  async function handleSaveClick() {
    handleAddNote({
      subject: noteSubject,
      text: noteText
    });
    setNoteSubject('');
    setNoteText('');
    document.getElementById('subject-area').value = '';
    document.getElementById('note-area').value = '';
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
