const express = require('express');
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../Controler/ProductsController');

const advancedResults = require('../Midlware/advancedResults');
const product = require('../Modul/Product');
const router = express.Router();

router
  .route('/')
  .get(
    advancedResults(product,{path:"user"}),getProduct);
    router.route("/:id").post(createProduct);

router
  .route('/:id')
  .put(updateProduct)
  .delete(deleteProduct);
  router.route('/:product_id/store_id')

module.exports = router;