const Order = require("../models/Order.model.js");
const catchAsyncError = require("../middlewares/catchAsyncError.js");

const createOrder = catchAsyncError(async (req, res) => {
  console.log(req.user);
  const { orderProductsDetails,shippingDetails } = req.body;
  console.log("🚀 ~ createOrder ~ shippingDetails:", shippingDetails)
  console.log("🚀 ~ createOrder ~ orderProductsDetails:", orderProductsDetails)

  const order = new Order({
    shippingDetails: shippingDetails,
    
    userId: req.user._id,
  });

  const newCart = await order.save();
  console.log("🚀 ~ addToCart ~ newCart:", newCart)
  // const result = await newCart.populate("product");

  res.status(201).json({
    success: true,
    message: "Product add to cart sucessfully",
    newCart,
  });
});

const productRemovefromCart = catchAsyncError(async (req, res) => {
  const { id } = req.params;

  const remvoeProduct = await Cart.findByIdAndDelete(id);
  console.log("🚀 ~ productRemovefromCart ~ remvoeProduct:", remvoeProduct);

  res.status(200).json({
    success: true,
    message: "Product remove from cart sucessfully",
    remvoeProduct,
  });
});

const fetchCartProduct = catchAsyncError(async (req, res) => {
  const { _id } = req.user;
  const cartProducts = await Cart.find({ userId: _id });

  res.status(200).json({
    success: true,
    message: "Product fetch sucessfully",
    cartProducts,
  });
});



const upgradeProductCart = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  console.log(req.body.quantity)
  const upgradedProduct = await Cart.findByIdAndUpdate(
    id,
    {
      $set: {
        quantity: req.body.quantity,
      },
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Product upgrade sucessfully",
    upgradedProduct,
  });
});


// delete all cart 

const removeAllCart = catchAsyncError(async (req, res) => {
  const { _id } = req.users;
  await Cart.deleteMany({ userId: _id });

  res.status(200).json({
    success: true,
    message: "All product in cart removed successfully",
  });
})

module.exports = {
    createOrder,
  };