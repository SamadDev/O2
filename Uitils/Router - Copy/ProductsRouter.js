  
const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../Controler/ProductsController');



const router = express.Router();
const {protect }= require('../Midlware/AuthMidleware');

router
  .route('/')
  .get(getProducts)
  .post(protect ,createProduct);

router
  .route('/:id')
  .get(protect,getProduct)
  .put(protect,updateProduct)
  .delete(protect,deleteProduct);

module.exports = router;