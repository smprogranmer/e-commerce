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
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      };
  
      next();
    } catch (error) {
     console.log(error)   
    }
})




module.exports = isAuthenticatedUser



