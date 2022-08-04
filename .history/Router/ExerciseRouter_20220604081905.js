const express = require('express');
const {
  getExercies,
  createExercies,
  updateexercies,
  deleteexercies
} = require('../Controler/ExercisesControler');

const advancedResults = require('../Midlware/advancedResults');
const Exercies = require('../Modul/exercise');
const router = express.Router();

// router
//   .route('/')
//   .get(
//     advancedResults(Exercies,{path:"user"}),getExercies);

router
  .route('/:id').post(createExercies)
  .put(updateexercies)
  .delete(deleteexercies);

module.exports = router;