const { process } = require('../../env.js');
const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND
} = require('../../util/constants').STATUS_CODES;

const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: apiKey
});
const openai = new OpenAIApi(configuration);

router.post('/generateResponse', async (req, res) => {
  const { prompt, maxTokens } = req.body;
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: maxTokens || 20
    })
    const generatedResponse = response.data.choices[0].text.trim();
    res.json({response: generatedResponse});
  } catch(err) {
    console.log(err);
    res.sendStatus(BAD_REQUEST);
  }
})

module.exports = router;