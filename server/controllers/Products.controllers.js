const {
  uploadOnCloudinary,
  multiple,
  uploadPromises,
} = require("../config/cloudinary");
const catchAsyncError = require("../middlewares/catchAsyncError");
const Order = require("../models/Order.model");
const products = require("../models/Products.model");
const stock = require("../models/Stock.model");
const UsersModel = require("../models/Users.model");
const { patch } = require("../test");
const ErroHandler = require("../utils/erroHandler");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dlmjkprba",
  api_key: "516442183868363",
  api_secret: "0h5n9KPUr7CSztPQMY0HiKPIifs",
});

const HomePage = catchAsyncError(async (req, res, next) => {
  res.send("hello");
});

const getAllProducts = catchAsyncError(async (req, res, next) => {
  const { category, size, orderBy } = req.query;
  const queryObject = {};
  // console.log(category.toString())
  if (category) {
    queryObject.category = category;
  }
  if (size) {
    queryObject.size = size;
  }

  if (orderBy) {
    console.log(orderBy);
  }
  const Products = await stock.find(queryObject);
  console.log("🚀 ~ getAllProducts ~ Products:", Products.length);

  res.status(200).json({
    success: true,
    Products,
  });
});

const getTandingProducts = catchAsyncError(async (req, res, next) => {
  const Products = await stock.find();

  res.status(200).json({
    success: true,
    Products,
    message: "Product fetch sucessfully",
  });
});

const cloudinaryTest = catchAsyncError(async (req, res, next) => {
  const files = req.files;
  const { name, description, price, image, category } = req.body;
  console.log(
    "🚀 ~ file: Products.controllers.js:25 ~ cloudinaryTest ~ files:",
    files
  );
  const urls = [];
  // console.log("🚀 ~ file: Products.controllers.js:40 ~ cloudinaryTest ~ urls:", urls)
  for (const file of files) {
    const { path } = file;
    // console.log("🚀 ~ file: Products.controllers.js:94 ~ //res.status ~ path:", path)
    const newPath = await cloudinary.uploader.upload(path, {
      resource_type: "auto",
      folder: "NIBH_IMAGES",
    });
    // console.log("🚀 ~ file: Products.controllers.js:40 ~ createProducts ~ newPath:", newPath)
    urls.push(newPath);
  }

  const imgData = urls.map((url) => ({
    public_id: url.public_id,
    url: url.secure_url,
  }));
  console.log(
    "🚀 ~ file: Products.controllers.js:54 ~ cloudinaryTest ~ imgData:",
    imgData
  );
  const Products = await products.create({
    name,
    description,
    price,
    category,
    image: imgData,
  });

  res.status(201).json({
    message: "Product created succfully",
    Products,
  });
});

const getOneProduct = catchAsyncError(async (req, res, next) => {
  const product = await products.findById(req.params.id);

  if (!product) {
    return next(new ErroHandler("Invalied id ", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

const createProducts = catchAsyncError(async (req, res, next) => {
  // const {name,description,price,image,category} = req.body
  // const files = req.files
  // // console.log("🚀 ~ file: Products.controllers.js:36 ~ createProducts ~ files:", files)
  // // let path = files.map(file => file.path)

  // const uploadPromises = files.map((file) => {
  //   const base64Data = file.buffer.toString('base64');
  //   return cloudinary.uploader.upload(`data:${file.mimetype};base64,${base64Data}`, {
  //     folder: 'your-folder',
  //   }).then((result) => {
  //     if (result.error) {
  //       console.error('Cloudinary Upload Error:', result.error.message);
  //     }
  //     return result;
  //   });
  // });

  // const uploadedResults = await Promise.all(uploadPromises);
  // const imageUrls = uploadedResults.map((result) => result.secure_url);
  // console.log("🚀 ~ file: Products.controllers.js:53 ~ createProducts ~ imageUrls:", imageUrls)
  // const json = req.json(uploadedResults)
  // console.log("🚀 ~ file: Products.controllers.js:54 ~ createProducts ~ json:", json)
  // console.log("🚀 ~ file: Products.controllers.js:50 ~ createProducts ~ uploadedResults:", uploadedResults)

  // console.log("🚀 ~ file: Products.controllers.js:38 ~ createProducts ~ urls:", urls)
  // // const imgData = urls.map(url =>{
  // //   const secure_url = url.secure_url;
  // //   const public_id = url.public_id;
  // //   return su
  // // })

  // const imgData = urls.map( url => ({public_id: url.public_id, url: url.secure_url}))
  // console.log("🚀 ~ file: Products.controllers.js:53 ~ createProducts ~ imgData:", imgData)

  // const Products = await products.create({
  //   name,
  //   description,
  //   price,
  //   category,
  // });

  // res.status(201).json({
  //   success: true,
  //   Products,
  const { name, description, price, image, category } = req.body;
  const files = req.files;
  // console.log("🚀 ~ file: Products.controllers.js:88 ~ //res.status ~ files:", files)
  //  uploadPromises(files)
  // const hello = multiple(files)
  // console.log("🚀 ~ file: Products.controllers.js:104 ~ //res.status ~ hello:", hello)
  const c = await uploadOnCloudinary(files[0].path);

  //   const urls = []
  //   console.log("🚀 ~ file: Products.controllers.js:88 ~ //res.status ~ urls:", urls)
  //   for(const file of files){
  //     const {path} = file;
  //     console.log("🚀 ~ file: Products.controllers.js:94 ~ //res.status ~ path:", path)
  //     const newPath = await uploadOnCloudinary(path)
  //     console.log("🚀 ~ file: Products.controllers.js:40 ~ createProducts ~ newPath:", newPath)
  //     urls.push(newPath)
  //   }
  // console.log("hello")
  // const uploadedResults = await Promise.all(uploadPromises);
  // console.log("🚀 ~ file: Products.controllers.js:100 ~ createProducts ~ uploadedResults:", uploadedResults)

  // Extract Cloudinary URLs
  // const imageUrls = uploadedResults.map((result) => result.secure_url);

  // Log the image URLs to the console
  // console.log('Image URLs:', imageUrls);

  const Products = await products.create({
    name,
    description,
    price,
    category,
    image,
  });

  res.status(201).json({
    success: true,
    Products,
  });
  // Create a new product in MongoDB
  // const newProduct = new Product({
  //   name,
  //   stock,
  //   imageUrls,
  // });

  // await newProduct.save();

  // res.json({ message: 'Files uploaded to Cloudinary and saved in MongoDB.' });
});

const upgradeProducts = catchAsyncError(async (req, res, next) => {
  let Products = products.findById(req.params.id);

  if (!Products) {
    return next(new ErroHandler("Invalied id", 404));
  } else {
    Products = await products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  }

  res.status(201).json({
    success: true,
    Products,
  });
});

const deleteProducts = catchAsyncError(async (req, res, next) => {
  let Products = products.findById(req.params.id);

  if (!Products) {
    return next(new ErroHandler("Invalied id ", 404));
  } else {
    Products = await products.deleteOne({ _id: req.params.id });
  }

  res.status(200).json({
    success: true,
    Products,
  });
});

const searchProducts = catchAsyncError(async (req, res, next) => {
  const { searchTerm } = req.params;
  console.log("🚀 ~ searchProduproducts ~ search:", searchTerm);
  const product = await products.find({
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { category: { $regex: searchTerm, $options: "i" } },
    ],
  });
  console.log("🚀 ~ searchProducts ~ product:", product);
  res.status(200).json({
    success: true,
    product,
  });
});

const orders = catchAsyncError(async (req, res, next) => {
  const { addressData, hello: products, total: totalPrice } = req.body;
  console.log(req.body);
  const user = await UsersModel.findById(req.users._id);
  if (!user) {
    return next(new ErroHandler("Invalid user id", 404));
  }

  const order = await Order.create({
    orderProducts: products,
    totalPrice,
    userId: req.users._id,
  });

  user.address = addressData;
  user.orders.push(order._id);

  // const createdOrders = await Promise.all(orderPromises);

  await user.save();
  res.status(200).json({
    success: true,
    message: "Order created successfully",
    order,
  });
});

// myOrders 
const myOrders = catchAsyncError(async (req,res) => {
  const orders = await Order.find({userId: req.users._id})
  
  res.status(200).json({success: true, message: "Order get successfully",orders});
})
module.exports = {
  getAllProducts,
  createProducts,
  upgradeProducts,
  getOneProduct,
  deleteProducts,
  HomePage,
  cloudinaryTest,
  searchProducts,
  orders,
  myOrders
};
