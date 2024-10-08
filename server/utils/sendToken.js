exports.sendToken = (user,statusCode,res)=>{
    const token = user.getJwtToken()
    const options ={
        expire: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 *60*60*1000
        ),
        httpOnly:true,
        sameSite: "none",
        secure: true,
    }

    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        // user,
        token
    })   
}