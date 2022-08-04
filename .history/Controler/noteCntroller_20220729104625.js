const Note = require('../Modul/note');
const asyncHandler = require("../Midlware/async");

exports.getNote = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      create note
// @route     PUT /api/v1/note
// @access    Private
exports.createNote= asyncHandler(async (req, res) => {
  req.body.user = req.params.id;
  const note = await Note.create(req.body);
  res.status(200).json({
    success: true,
    data: note,
  });
});

// @desc      Update note
// @route     PUT /api/v1/note/:id
// @access    Private
exports.updateNote = asyncHandler(async (req, res, next) => {
  try {
    let note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
});

// @desc      Delete note
// @route     DELETE /api/v1/note/:id
// @access    Private
exports.deleteNote = asyncHandler(async (req, res, next) => {
  try {
    let note = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
});
