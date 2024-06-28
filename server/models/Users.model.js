const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    maxLength: [30, "name should be less than 30 charator"],
    minLength: [4, "name should be grather than 4 charator"],
  },
  phone: {
    type: Number,
    required: [true, "please enter your phone number "],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter your email"],
    validate: [validator.isEmail, "Please Enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    minLength: [4, "name should be grather than 4 charator"],
    select: false,
  },
  address: [
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  // avatar:{

  //         public_id:{
  //             type:String,
  //             required:true
  //         },
  //         url:{
  //             type:String,
  //             required:true
  //         }

  // },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswerdExprie: Date,
});

// password hasing with bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// json web token
UserSchema.methods.getJwtToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.comperPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// userModel.methods.comparePassword = async function(enterdPasswrod){

//     return await bcrypt.compare(enterdPasswrod,this.password)
// }

module.exports = mongoose.model("Users", UserSchema);
