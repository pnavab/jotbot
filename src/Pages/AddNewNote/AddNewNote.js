import React, { useEffect, useState } from 'react';

import './AddNewNote.css';
import AddNote from '../../Components/AddNote/AddNote';

export default function AddNewNote(props) {

  return (
    <>
      <div className='add-note-page'>
        <AddNote/>
      </div>
    </> 
  );
}
