// const ErroHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server error"

  // if(err.name === "CastError"){
  //   const message = `Resource not found. Invalid:${err.path}`
  //   err = new ErroHandler(message,404)
  // }

  res.status(err.statusCode).json({
    success:false,
    message: err.message
  })
};
