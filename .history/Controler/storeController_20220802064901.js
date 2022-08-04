const Store = require('../Modul/store');
const asyncHandler = require("../Midlware/async");
const Product=require("../Modul/Product");

exports.getStore = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      create store
// @route     PUT /api/v1/store
// @access    Private
exports.createStore= asyncHandler(async (req, res) => {
  req.body.user = req.params.id;
  const store = await Store.create(req.body);
  res.status(200).json({
    success: true,
    data: store,
  });
});


// @desc      Update store
// @route     PUT /api/v1/store/:id
// @access    Private
exports.updateStore = asyncHandler(async (req, res, next) => {
  try {
    
    let store = await Store.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: store });
  } catch (err) {
    next(err);
  }
});

// @desc      Delete store
// @route     DELETE /api/v1/store/:id
// @access    Private
exports.deleteStore = asyncHandler(async (req, res, next) => {
  try {
    const ifContain=await Product.any({_id:req.params.id});
    if(ifContain){
      res.status(400).json({ success: false, data: "ببورە ناتوانی ئەم بابە بسریتەوە لە شوێنیتر بەکارهاتوە" });
    }else{
    let store = await Store.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: store });}
  } catch (err) {
    next(err);
  }
});
