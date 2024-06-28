
const JWT  =  require("jsonwebtoken")
const sendVeryToken = (payload) =>{
    return  JWT.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_VERY_EXPIRE,
    })
}

module.exports = sendVeryToken