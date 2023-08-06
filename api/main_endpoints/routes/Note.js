const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND
} = require('../../util/constants').STATUS_CODES;


router.post('/createNote', (req, res) => {
  const { id, subject, text, date } = req.body;
  
  const newNote = new Note({
    id: id,
    subject: subject || '',
    text: text,
    date: date,
  });

  Note.create(newNote)
    .then(post => {
      return res.json(post);
    })
    .catch(error => {
      return res.sendStatus(BAD_REQUEST);
    })
});

router.get('/getNotes', (req, res) => {
  Note.find()
    .then(items => res.status(OK).send(items))
    .catch(error => {
      res.sendStatus(BAD_REQUEST);
    });
});

router.post('/deleteNote', (req, res) => {
  Note.deleteOne({ _id: req.body.id })
    .then(result => {
      if (result.n < 1) {
        res.sendStatus(NOT_FOUND);
      } else {
        res.sendStatus(OK);
      }
    })
    .catch(() => {
      res.sendStatus(BAD_REQUEST);
    });
});

module.exports = router;
