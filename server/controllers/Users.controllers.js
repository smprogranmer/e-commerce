const catchAsyncError = require("../middlewares/catchAsyncError");
const users = require("../models/Users.model");
const ErroHandler = require("../utils/erroHandler");
const sendEmail = require("../utils/sendEmail");
const { sendToken } = require("../utils/sendToken");
const sendVeryToken = require("../utils/sendVeriyToken");

const getAllUsers = catchAsyncError(async (req, res, next) => {
  const Users = await users.find();

  res.status(200).json({
    success: true,
    Users,
  });
});
const getSingleUser = catchAsyncError(async (req, res, next) => {
  const Users = await users.findById(req.users._id);

  res.status(200).json({
    success: true,
    Users,
  });
});

const verifyUser = catchAsyncError(async (req, res, next) => {
  const req_body = req.body;
  console.log("🚀 ~ verifyUser ~ req_body:", req_body);
  const req_query = req.query;
  console.log("🚀 ~ verifyUser ~ req_query:", req_query);

  res.status(200).json({
    message: "email send to your email",
  });

  // sendToken(Users,201,res)
});
const registerUsers = catchAsyncError(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  const existingUser = await users.exists({ email: email });
  if (existingUser) {
    return next(
      new ErroHandler("User with  this email already exits, Please login ", 409)
    );
  }

  // prepare email
  const emailData = {
    email,
    subject: "Account Activation Email",
    html: ` <h2>Hello ${name} !</h2> <p>Click the following link to verify your email: <a href=" http://localhost:5173/user_activetion">hello</a> </p>`,
  };

  try {
    await sendEmail(emailData);
  } catch (error) {
    console.log("🚀 ~ registerUsers ~ sending email ~ error:", error);
  }
  // const Users = users.getJwtToken()
  // console.log("🚀 ~ registerUsers ~ Users:", Users)

  const token = sendVeryToken({ email });

  res.status(200).json({
    message: "email send to your email",
    payload: { token },
  });

  // sendToken(Users,201,res)
});

const loginUsers = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErroHandler("invalied email and password"));
  }

  const user = await users.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErroHandler("Invalied email please enter your email"));
  }

  const isPasswordMatch = await user.comperPassword(password);

  if (!isPasswordMatch) {
    return next(new ErroHandler("Invalied Password"));
  }

  sendToken(user, 200, res);
});

const logOutUsers = catchAsyncError(async (req, res, next) => {
  // Clear the token cookie with immediate expiration and make it httpOnly
  res.cookie("token", null, { expires: new Date(0), httpOnly: true });

  // Send a JSON response indicating successful user logout
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
});

const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const Users = await users.findById(req.users.id).select("+password");
  // console.log(Users)

  const isPasswordMatch = await Users.comperPassword(oldPassword);

  if (!isPasswordMatch) {
    return next(new ErroHandler("Invalied oldPassword"), 401);
  }

  Users.password = newPassword;
  await Users.save();

  sendToken(Users, 200, res);
});

const upgradeProfile = catchAsyncError(async (req, res, next) => {
  const { name, email, role,address } = req.body;

  const Users = await users.findById(req.users.id);

  if (name) Users.name = name;
  if (email) Users.email = email;
  if (role) Users.role = role;
  // console.log(Users)

  await Users.save();

  sendToken(Users, 200, res);
});

const deleteUsers = catchAsyncError(async (req, res, next) => {
  const Users = await users.findById(req.params.id);

  if (!Users) {
    return next(new ErroHandler("user dose not exit"), 404);
  }

  await Users.remove();

  sendToken(Users, 200, res);
});



module.exports = {
  getAllUsers,
  registerUsers,
  loginUsers,
  logOutUsers,
  changePassword,
  upgradeProfile,
  getSingleUser,
  deleteUsers,
  verifyUser,
};
