const ErroHandler = require("../utils/erroHandler");
const catchAsyncError = require("./catchAsyncError");
const users = require('../models/Users.model');
const JWT  =  require("jsonwebtoken")

const isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    try {
        const {token} = req.cookies
        // console.log("🚀 ~ isAuthenticatedUser ~ token:", req.cookies)
        
        if(!token){
            return next(new ErroHandler('please login to accesss',401))
        }
    
        const  decodeDate = JWT.verify(token,process.env.JWT_SECRET)
        if(!decodeDate){
            throw next(new ErroHandler("Invalied access token. Please login againg",401))
        }
        req.users = await users.findById(decodeDate.id)

        
        next()
    } catch (error) {
     console.log(error)   
    }
})




module.exports = isAuthenticatedUser



