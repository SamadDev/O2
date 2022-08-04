const express = require("express");
const {
  getStore,
  createStore,
  updateStore,
  deleteStore,
  store_divide,
} = require("../Controler/storeController");

const advancedResults = require("../Midlware/advancedResults");
const store = require("../Modul/store");
const router = express.Router();

router.route("/").get(advancedResults(store), getStore).post(createStore);
router.route("/:userId").post()
router.route("/:id").put(updateStore).delete(deleteStore);
router.route('/:userId').post(store_divide);

module.exports = router;
