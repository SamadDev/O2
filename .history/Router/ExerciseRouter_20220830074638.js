const express = require('express');
const {
  getExercies,
  createExercies,
  updatEexercies,
  deletEexercies
} = require('../Controler/ExercisesControler');

const advancedResults = require('../Midlware/advancedResults');
const Exercies = require('../Modul/exercise');
const router = express.Router();

router
  .route('/')
  .get(
    advancedResults(Exercies,{path:"user"}),getExercies);

router
  .route('/:id').post(createExercies)
  .put(updatEexercies);
  router.route("/:id/:product_id/:store_id").delete(deletEexercies);

module.exports = router;