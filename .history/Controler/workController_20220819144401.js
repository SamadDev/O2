const Work = require('../Modul/work_time');
const asyncHandler = require("../Midlware/async");

exports.getWork = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      create work
// @route     PUT /api/v1/work
// @access    Private
exports.createWork= asyncHandler(async (req, res) => {
  req.body.user = req.params.id;
  const work = await Work.create(req.body);
  res.status(200).json({
    success: true,
    data: work,
  });
});

// @desc      Update work
// @route     PUT /api/v1/work/:id
// @access    Private
exports.updateWork = asyncHandler(async (req, res, next) => {
  try {
    let work = await Work.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: work });
  } catch (err) {
    next(err);
  }
});

// @desc      Delete work
// @route     DELETE /api/v1/work/:id
// @access    Private
exports.deleteWork = asyncHandler(async (req, res, next) => {
  try {
    let work = await Work.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: work });
  } catch (err) {
    next(err);
  }
});
