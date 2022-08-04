const Product = require("../Modul/Product");
const Store = require("../Modul/store");
const asyncHandler = require("../Midlware/async");

exports.getProduct = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      create product
// @route     PUT /api/v1/product
// @access    Private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.user = req.params.id;
  const { store_id, amount } = req.body;
  console.log(store_id);
  const product = await Product.create(req.body);
  const store = await Store.findOne({ _id: store_id });
  await Store.findByIdAndUpdate(
    { _id: store_id },
    {
      amount: store.amount - amount,
    },
    { new: true, runValidators: true }
  );

  console.log(store);
  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc      Update product
// @route     PUT /api/v1/product/:id
// @access    Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { amount, store_id } = req.body;
  try {
    const product_id = await Product.findById(req.params.id);
    const store = await Store.findById({ _id: store_id });
    if(amount>store.amount+product_id.amount){
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

   await Store.updateOne(
      {
        _id: store_id,
      },
      {
        amount:product_id.amount + store.amount - amount
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: product });}else{
      res.status(400).json({success:false,data:"ببورە ئەورێژە لە کۆگا نەماوە"})
    }
  } catch (err) {
    next(err);
  }
});

// @desc      Delete product
// @route     DELETE /api/v1/product/:id
// @access    Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
});
