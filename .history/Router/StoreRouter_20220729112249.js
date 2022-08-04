const express = require('express');
const {
  getStore,
  createStore,
  updateStore,
  deleteStore
} = require('../Controler/storeController');

const advancedResults = require('../Midlware/advancedResults');
const store = require('../Modul/store');
const router = express.Router();

router
  .route('/')
  .get(
    advancedResults(store,{path:"user"}),getStore);
    router.route("/:id").post(createStore);

router
  .route('/:id')
  .put(updateStore)
  .delete(deleteStore);

module.exports = router;