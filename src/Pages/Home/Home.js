import React, { useEffect, useState } from 'react';
import './Home.css';
import { Col, Row } from 'reactstrap';

export default function Home() {
  const [data, setData] = useState([]);
  const [note, setNote] = useState();
  const Notes = props => props.data.map(note => <div>{note.text}</div>);
  const initialData = [{ text: 'Hey' }, { text: 'There' }];

  async function handleClick() {
    const text = document.qu
  }

  useEffect(() => {
    setData(initialData);
  }, []);

  return (
    <>
      <div className='home-page'>
        <input type="text" placeholder="Enter a new note" onChange={e => setNote(e.target.value)}/>
        <button>Add note</button>
        <Row className='select-row'>
          Notes
        </Row>
        <Row>
          <Notes data={data} />
        </Row>
      </div>
    </> 
  );
}
