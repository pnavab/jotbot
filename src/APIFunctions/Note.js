import axios from 'axios';

import { ApiResponse } from './ApiResponses';

let GENERAL_API_URL = process.env.REACT_APP_GENERAL_API_URL || 'http://localhost:7000/api';

export async function getAllNotes(token) {
  let status = new ApiResponse();
  await axios
    .get(GENERAL_API_URL + '/Note/getNotes', {
      params: { token }
    })
    .then(res => {
      status.responseData = res.data;
    })
    .catch(err => {
      status.error = true;
      status.responseData = err;
    });
  return status;
}

export async function createNote(subject = null, text) {
  let status = new ApiResponse();
  const date = new Date().toLocaleDateString();
  const noteToAdd = {
    subject,
    text,
    date
  };

  try {
    const response = await axios
      .post(GENERAL_API_URL + '/Note/createNote', { ...noteToAdd });
    const data = response.data;
    status.responseData = data;
  } catch(err) {
    status.error = true;
    status.responseData = err;
  }
  return status;
}

export async function deleteNote(id) {
  let status = new ApiResponse();
  await axios
    .post(GENERAL_API_URL + '/Note/deleteNote', { _id: id })
    .catch(err => {
      status.error = true;
      status.responseData = err;
    });
  return status;
}
