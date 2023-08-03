import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import './Home.css';
import { Col, Row } from 'reactstrap';
import Note from '../../Components/Note/Note';
import NotesList from '../../Components/NotesList/NotesList';

export default function Home() {
  const [allNotes, setAllNotes] = useState([]);
  const [subject, setSubject] = useState('');
  const [note, setNote] = useState('');

  async function deleteNote(id) {
    console.log(id);
    setAllNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  async function addNote(note) {
    console.log(note)
    const date = new Date();
    const newNote = {
      id: nanoid(),
      subject: note.subject,
      text: note.text,
      date: date.toLocaleDateString(),
    };
    setAllNotes([...allNotes, newNote]);
  }

  useEffect(() => {
    console.log(allNotes);
  }, [allNotes]);

  return (
    <>
      <div className='home-page'>
        <div className='notes-container'>
          <NotesList
            notes= { allNotes }
            handleDeleteNote= { deleteNote }
            handleAddNote={ addNote }
          >
          </NotesList>
        </div>
      </div>
    </> 
  );
}
