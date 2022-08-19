const express = require("express");
const {
  getWork,
  createWork,
  updateWork,
  deleteWork,
} = require("../Controler/workController");

const advancedResults = require("../Midlware/advancedResults");
const work = require("../Modul/work_time");
const router = express.Router();

router.route("/").get(advancedResults(work ,{path:"user"}), getWork);

router.route("/:id").post(createWork).put(updateWork).delete(deleteWork);

module.exports = router;
