const express = require('express');
const {
  getExercies,
  createExercies,
  updateexercies,
  deleteexercies
} = require('../Controler/ExercisesControler');

const advancedResults = require('../Midlware/advancedResults');
const exercies = require('../Modul/exercise');
const router = express.Router();

router
  .route('/')
  .get(
    advancedResults(exercies,{path:"user"}),getExercies);
    router.route("/:id").post(createExercies);

router
  .route('/:id')
  .put(updateexercies)
  .delete(deleteexercies);

module.exports = router;