const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND
} = require('../../util/constants').STATUS_CODES;


router.post('/createNote', (req, res) => {
  const { subject, text, date } = req.body;
  
  const newNote = new Note({
    subject: subject,
    text: text,
    date: date,
  });
  console.debug('newNote is ', newNote);
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
  Note.deleteOne({ _id: req.body._id })
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

router.post('/deleteAll', (req, res) => {
  Note.deleteMany({ "__v": "0"})
    .then(res.sendStatus(OK))
    .catch(err => {
      res.sendStatus(BAD_REQUEST)
    });
});
module.exports = router;
