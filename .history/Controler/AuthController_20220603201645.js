const ErrorResponse = require("../Uitils/ErrorResponse");
const User = require("../Modul/Auth");
const bcrypt = require("bcrypt");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = async (req, res, next) => {
  const { name, password, phone } = req.body;
  try {
    // Create user
    const user = await User.create({
      name,
      password,
      phone,
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
  const { phone, password } = req.body;
  const user = await User.findOne({ phone }).select("+password");
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
  console.log(req);
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
