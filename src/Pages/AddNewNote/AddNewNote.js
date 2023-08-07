import React, { useEffect, useState } from 'react';

import { createNote } from '../../APIFunctions/Note';
import './AddNewNote.css';
import AddNote from '../../Components/AddNote/AddNote';
import { useNavigate } from 'react-router-dom';

export default function AddNewNote(props) {
  const [noteSubject, setNoteSubject] = useState('');
  const [noteText, setNoteText] = useState('');
  const navigate = useNavigate();

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

  return (
    <>
      <div className='add-note-page'>
        <AddNote
          handleAddNote={ handleAddNote }
        />
      </div>
    </> 
  );
}
