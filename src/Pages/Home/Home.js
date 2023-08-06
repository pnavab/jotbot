import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

import { getAllNotes, createNote, deleteNote } from '../../APIFunctions/Note';
import Note from '../../Components/Note/Note';
import NotesList from '../../Components/NotesList/NotesList';
import './Home.css';

export default function Home(props) {
  const [allNotes, setAllNotes] = useState([]);
  const [noteSubject, setNoteSubject] = useState('');
  const [noteText, setNoteText] = useState('');
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [errorGettingNotes, setErrorGettingNotes] = useState();

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

  async function addNote(subject, test) {
    const response = await createNote(subject, test);
    console.log(response);
    if(response.error) {
      console.log(response);
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
        {!loadingNotes && !errorGettingNotes && (
          <div className='notes-list'>
          {allNotes.map((note, index) => {
            return (
              <Note
                key={ index }
                subject={ note.subject }
                text={ note.text }
                date={ note.date }
                handleDeleteNote={ handleDeleteNote }
                id={ note._id }
                setAllNotes={ setAllNotes }
              />
            )
          })}
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
              <button className='save-button'onClick={() => addNote(noteSubject, noteText)}>Save</button>
            </div>
          </div>
        </div>
        )}
      </div>
    </> 
  );
}
