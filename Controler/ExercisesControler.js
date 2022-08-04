const Exercies = require('../Modul/exercise');
const asyncHandler = require("../Midlware/async");
const Store = require("../Modul/store")
const Product = require("../Modul/Product");

exports.getExercies = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      create exercies
// @route     PUT /api/v1/exercies
// @access    Private
exports.createExercies = asyncHandler(async (req, res) => {
  req.body.user = req.params.id;
  const { amount, store_id, product_id } = req.body;
  const exercies = await Exercies.create(req.body);
  const store = await Store.findOne({ _id: store_id });
  const product = await Product.findOne({ _id: product_id })
  product.update(
    { _id: product },
    {
      number: product.amount - amount,
    },
    { new: true, runValidators: true }
  );
  store.update(
    { _id: store_id },
    {
      number: store.number - amount,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    success: true,
    data: exercies,
  });
});

// @desc      Update exercies
// @route     PUT /api/v1/exercies/:id
// @access    Private
exports.updatEexercies = asyncHandler(async (req, res, next) => {
  try {
    const { amount, store_id, product_id } = req.body;
    const store = await Store.findOne({ _id: store_id });
    const product = await Product.findOne({ _id: product_id })
    product.update(
      { _id: product },
      {
        number: product.amount - amount,
      },
      { new: true, runValidators: true }
    );
    store.update(
      { _id: store_id },
      {
        number: store.number - amount,
      },
      { new: true, runValidators: true }
    );


    let exercies = await Exercies.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: exercies });
  } catch (err) {
    next(err);
  }
});

// @desc      Delete exercies
// @route     DELETE /api/v1/exercies/:id
// @access    Private
exports.deletEexercies = asyncHandler(async (req, res, next) => {
  try {
    const store=await Store.findOne({_id:store_id});
    const product=await Product.findOne({_id:product_id})
    const exercise=await Exercies.findOne({_id:req.params.id});
    product.update(
      { _id: product },
      {
        number: product.amount-exercies.amount,
      },
      { new: true, runValidators: true }
    );
    store.update(
      { _id: store_id },
      {
        number: store.number-exercies.amount,
      },
      { new: true, runValidators: true }
    );
  
    let exercies = await Exercies.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: exercies });
  } catch (err) {
    next(err);
  }
});
