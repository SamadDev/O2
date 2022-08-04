const express = require('express');
const {
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../Controler/orderCntroller');

const advancedResults = require('../Midlware/advancedResults');
const order = require('../Modul/order');
const router = express.Router();

router
  .route('/')
  .get(
    advancedResults(order,{path:"user"}),getOrder);
    router.route("/:id").post(createOrder);

router
  .route('/:id')
  .put(updateOrder)
  .delete(deleteOrder);

module.exports = router;