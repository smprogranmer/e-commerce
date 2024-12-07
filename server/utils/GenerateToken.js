const User = require("../models/Users.model");

exports.GenerateToken = async ( user_id) => {
    try {
      const user = await User.findById(user_id);
      console.log("🚀 ~ exports.GenerateToken= ~ user:", user)
  
      const accessToken = user.generateAccessToken();
  
      const refreshToken = user.generateRefreshToken();
  
      user.refreshToken = refreshToken;
      await user.save();
  
      const options = {
        expire: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      console.log(user)
  
      return {
        // upgradedUser: user,
        accessToken,
        refreshToken,
        options,
      };
    } catch (error) {
      console.log(error);
    }
  };
  