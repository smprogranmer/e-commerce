const ErroHandler = require("../utils/erroHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require('../models/Users.model');
const JWT  =  require("jsonwebtoken")

const isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    try {
        const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
  
      if (!token) {
        return next(new ErroHandler( "Unauthorized request",401));
      }
  
      const decodedToken = await JWT.verify(token, process.env.ACCESS_JWT_SECRET);
  
      const user = await User.findById(decodedToken.id);
      // console.log("🚀 ~ user:", user);
  
      if (!user) {
        return next(new ErroHandler( "Unauthorized request",401));
      }
  
      req.user = {
        _id: user._id,
      };
  
      next();
    } catch (error) {
      return next(new ErroHandler( "Invalid access token",401)); 
    }
})




module.exports = isAuthenticatedUser



