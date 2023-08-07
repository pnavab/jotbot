import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

import { getAllNotes, createNote, deleteNote } from '../../APIFunctions/Note';
import Note from '../../Components/Note/Note';
import NotesList from '../../Components/NotesList/NotesList';
import './Overview.css';
import AddNote from '../../Components/AddNote/AddNote';

export default function Overview(props) {
  const [allNotes, setAllNotes] = useState([]);
  const [noteSubject, setNoteSubject] = useState('');
  const [noteText, setNoteText] = useState('');
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [errorGettingNotes, setErrorGettingNotes] = useState();
  const [errorSubmittingNote, setErrorSubmittingNote] = useState();

  async function getAllUserNotes() {
    const notesFromDB = await getAllNotes();
    if (notesFromDB.error) {
      setErrorGettingNotes(true);
    } else {
      setErrorGettingNotes(false);
      setAllNotes(notesFromDB.responseData);
    } 
    setLoadingNotes(false);
  }

  async function handleDeleteNote(id) {
    const response = await deleteNote(id);
    if(response.error) {
      console.log('Error deleting note:', response.responseData);
    } else {
      setAllNotes(allNotes.filter((note) => note._id !== id));
    }
  }

  async function handleAddNote(subject, test) {
    const response = await createNote(subject, test);
    if(response.error) {
      console.log(response);
      setErrorSubmittingNote(true);
    } else {
      setAllNotes([...allNotes, response.responseData]);
      document.getElementById('subject-area').value = '';
      document.getElementById('note-area').value = '';
      setNoteSubject('');
      setNoteText('');
    }
  }

  useEffect(() => {
    getAllUserNotes();
  }, []);

  return (
    <>
      <div className='home-page'>
        {errorGettingNotes && (
          <p>Error retrieving notes from database</p>
        )}
        <h1>Overview</h1>
        {!loadingNotes && !errorGettingNotes && (
          <NotesList
            allNotes={ allNotes }
            handleDeleteNote={ handleDeleteNote }
          />
        )}
      </div>
    </> 
  );
}
