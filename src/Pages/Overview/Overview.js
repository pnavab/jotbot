import React, { useEffect, useState } from 'react';

import { getAllNotes, createNote, deleteNote } from '../../APIFunctions/Note';
import NotesList from '../../Components/NotesList/NotesList';
import './Overview.css';
import { useNavigate } from 'react-router-dom';

export default function Overview(props) {
  const [allNotes, setAllNotes] = useState([]);
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
        {allNotes.length <= 0 && (
          <div className='note-not-found'>
            <p>No notes found.</p>
            <a href='/create-note'>Click here to get started.</a>
          </div>
        )}
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
