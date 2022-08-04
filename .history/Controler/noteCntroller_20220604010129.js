const Order = require('../Modul/order');
const asyncHandler = require("../Midlware/async");

exports.getOrder = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      create order
// @route     PUT /api/v1/order
// @access    Private
exports.createOrder= asyncHandler(async (req, res) => {
  req.body.user = req.params.id;
  const order = await Order.create(req.body);
  res.status(200).json({
    success: true,
    data: order,
  });
});

// @desc      Update order
// @route     PUT /api/v1/order/:id
// @access    Private
exports.updateOrder = asyncHandler(async (req, res, next) => {
  try {
    let order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

// @desc      Delete order
// @route     DELETE /api/v1/order/:id
// @access    Private
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  try {
    let order = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});
