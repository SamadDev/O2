const express = require('express');
const {
  getNote,
  createNote,
  updateNote,
  deleteNote
} = require('../Controler/noteCntroller');

const advancedResults = require('../Midlware/advancedResults');
const note = require('../Modul/note');
const router = express.Router();

router
  .route('/')
  .get(
    advancedResults(note),getNote);

router
  .route('/:id').post(createNote)
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;