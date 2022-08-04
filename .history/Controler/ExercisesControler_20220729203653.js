const Exercies = require('../Modul/exercise');
const asyncHandler = require("../Midlware/async");
const Store=require("../Modul/store")

exports.getExercies = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      create exercies
// @route     PUT /api/v1/exercies
// @access    Private
exports.createExercies= asyncHandler(async (req, res) => {
  req.body.user = req.params.id;
  const {amount}=req.body;
  const exercies = await Exercies.create(req.body);
  const store=await Store.findOne({_id:store_id});
  await Store.findByIdAndUpdate(
    { _id: store_id },
    {
      number: store.number-amount,
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
exports.updateexercies = asyncHandler(async (req, res, next) => {
  try {
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
exports.deleteexercies = asyncHandler(async (req, res, next) => {
  try {
    let exercies = await Exercies.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: exercies });
  } catch (err) {
    next(err);
  }
});
