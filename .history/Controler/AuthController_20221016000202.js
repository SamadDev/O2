const ErrorResponse = require("../Uitils/ErrorResponse");
const User = require("../Modul/Auth");
const Product = require("../Modul/Product");
const Excercise = require("../Modul/exercise");
const Note = require("../Modul/note");
const Work = require("../Modul/work_time");
const bcrypt = require("bcrypt");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = async (req, res, next) => {
  const { name, password, phone, role } = req.body;
  try {
    // Create user
    const user = await User.create({
      name,
      password,
      phone,
      role,
    });

    // Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });
  } catch (err) {
    next(err);
  }
};

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = async (req, res, next) => {
  const { phone, password, role } = req.body;
  const user = await User.findOne({ phone, role }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
  res.status(200).json({
    success: true,
    data: user,
  });
};

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = async (req, res, next) => {
  const user = await await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
};

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getUsers = async (req, res, next) => {
  const user = await User.find({});

  res.status(200).json({
    success: true,
    data: user,
  });
};

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  console.log(user);
  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
};

// @desc      Delete user
// @route     DELETE /api/v1/user/:id
// @access    Private
exports.deleteUser = async (req, res, next) => {
  try {
    console.log(req.params.id);
    let if_containe_product = await Product.findOne({ user: req.params.id });
    let if_containe_excercise = await Excercise.findOne({ user: req.params.id, });
    let if_containe_note = await Note.findOne({ user: req.params.id });
    let if_containe_work_time = await Work.findOne({ user: req.params.id });
    if (
      if_containe_product ||
      if_containe_excercise ||
    ) {
      console.log(if_containe_excercise)
      res.status(400).json({
        success: false,
        data: "ببورە ناتوانی ئەم بابە بسریتەوە لە شوێنیتر بەکارهاتوە",
      });
    } else {
      res.status(400).json({
        success: false,
        data: "srinawa",
      });
      console.log("delete user");
      // await User.findByIdAndDelete(req.params.id);
    }

    // res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();
  //todo expire jwt_cookie_expire not working
  // const options = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // };

  // if (process.env.NODE_ENV === "production") {
  //   options.secure = true;
  // }

  res.status(statusCode).cookie("token", token, true).json({
    success: true,
    token,
  });
};
