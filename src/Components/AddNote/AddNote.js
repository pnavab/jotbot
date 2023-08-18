import React, { useState } from 'react';
import './AddNote.css';
import { useNavigate } from 'react-router-dom';
import { createNote } from '../../APIFunctions/Note';
import { Row } from 'reactstrap';

export default function AddNote(props) {
  const [noteSubject, setNoteSubject] = useState('');
  const [noteText, setNoteText] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [charCount, setCharCount] = useState(0);
  const navigate = useNavigate();

  let MAX_NOTE_CHAR_LENGTH = 1000;
  let MAX_NOTE_SUBJECT_LENGTH = 60;

  async function handleAddNote(subject, test) {
    const response = await createNote(subject, test);
    if(response.error) {
      console.log(response);
    } else {
      document.getElementById('subject-area').value = '';
      document.getElementById('note-area').value = '';
      setNoteSubject('');
      setNoteText('');
      navigate('/overview');
    }
  }

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
    <div className='new-note'>
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
      <div className='gpt-response-area'>

      </div>
      <Row>
        <textarea
          className='prompt-area'
          id='prompt-area'
          rows='4'
          cols='10'
          placeholder='Ask chat gpt here'
        >
        </textarea>
        <button className='ask-ai-button' onClick={() => handleAddNote(noteSubject, noteText)}>
          Save
        </button>
      </Row>
      <div className='note-footer'>
        <small>{ charCount }/{ MAX_NOTE_CHAR_LENGTH }</small>
        {noteText.length > 0 && (
          <button className='save-note-button' onClick={() => handleAddNote(noteSubject, noteText)}>
            Save
          </button>
        )}
      </div>
    </div>
  );
}
