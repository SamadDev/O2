const express = require('express');
const {
  getExercie,
  createExercies,
  updateexercies,
  deleteexercies
} = require('../Controler/exerciseController');

const advancedResults = require('../Midlware/advancedResults');
const exercies = require('../Modul/exercise');
const router = express.Router();

router
  .route('/')
  .get(
    advancedResults(exercies,{path:"user"}),getExercie);
    router.route("/:id").post(createExercies);

router
  .route('/:id')
  .put(updateexercies)
  .delete(deleteexercies);

module.exports = router;