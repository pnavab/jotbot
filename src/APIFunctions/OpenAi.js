import axios from 'axios';

import { ApiResponse } from './ApiResponses';

let GENERAL_API_URL = process.env.REACT_APP_GENERAL_API_URL || 'http://localhost:7000/api';

export async function getOpenAiResponse(prompt) {
  let status = new ApiResponse();
  const promptJson = {
    prompt
  };
  try {
    const response = await axios
      .post(GENERAL_API_URL + '/OpenAi/generateResponse', { ...promptJson });
    const data = response.data;
    status.responseData = data;
  } catch(err) {
    status.error = true;
    status.responseData = err;
  }
  return status;
}
