const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema(
  {
    subject: {
      type: String
    },
    text: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
  },
  { collection: 'Note' }
);

module.exports = mongoose.model('Note', NoteSchema);
