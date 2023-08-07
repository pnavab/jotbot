import React, { useState } from 'react';
import './AddNote.css';

export default function AddNote({ handleAddNote }) {
  const [noteSubject, setNoteSubject] = useState('');
  const [noteText, setNoteText] = useState('');
  const [charCount, setCharCount] = useState(0);

  let MAX_NOTE_CHAR_LENGTH = 1000;
  let MAX_NOTE_SUBJECT_LENGTH = 60;

  async function handleNoteSubjectChange(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    
    if (e.target.value.length <= 30) {
      setNoteSubject(e.target.value);
    }
  }

  async function handleNoteTextChange(e) {
    if(e.target.value.length <= MAX_NOTE_CHAR_LENGTH) {
      setNoteText(e.target.value);
    }

    setCharCount(e.target.value.length);
  }

  return (
    <div className='note new'>
      <textarea
        className='subject-area'
        id='subject-area'
        rows='1'
        cols='10'
        placeholder='Subject'
        onChange={e => {handleNoteSubjectChange(e)}}
        onKeyDown={e => {handleNoteSubjectChange(e)}}
        maxLength={ MAX_NOTE_SUBJECT_LENGTH }
        >
      </textarea>
      <textarea
        className='note-area'
        id='note-area'
        rows='8'
        cols='10'
        placeholder='Click here to add note'
        onChange={e => {handleNoteTextChange(e)}}
        maxLength={ MAX_NOTE_CHAR_LENGTH }
      >
      </textarea>
      <div className='note-footer'>
        <small>{ charCount }/{ MAX_NOTE_CHAR_LENGTH }</small>
        {noteText.length > 0 && (
          <button className='save-button' onClick={() => handleAddNote(noteSubject, noteText)}>
            Save
          </button>
        )}
      </div>
    </div>
  );
}
