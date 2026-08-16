const {
  uploadOnCloudinary,
  multiple,
  uploadPromises,
} = require("../config/cloudinary");
const uploadOnCloudinaryTwo = require("../config/CloudinaryTwo");

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
  const { name, description, price, images, sizes, category } = req.body;
  console.log("skldfklsdfkls");
  console.log(name, description, price, images, sizes, category);
  const files = req.files;
  console.log("��� ~ cloudinaryTest ~ files:", req);

  if (!name || !description || !price || !sizes || !images || !category) {
    return next(new ErroHandler("Please fill all the fields", 400));
  }

  const imgData = await Promise.all(
    files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
        folder: "NIBH_IMAGES",
      })
    )
  ).then((results) =>
    results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }))
  );

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

const product = catchAsyncError(async (req, res, next) => {
  const { name, description, price, category, model,size52,size54,size56, slug } = req.body;
  console.log("🚀 ~ file: Products.controllers.js:140 ~ product ~ req.body:", req.body)

  // check is it number or string 
  console.log("🚀 ~ file: Products.controllers.js:142 ~ product ~ size52:", typeof size52)

  const imageUrls = await uploadOnCloudinaryTwo(
    req.files.map((file) => file.path)
  );

  const newProduct = new products({
    name,
    description,
    price,
    slug,
    category,
    sizes: {
      // Correct key name
      52: size52,
      54: size54,
      56: size56,
    },
    model,
    images: imageUrls.map((url) => ({
      url,
      alt: "Two Part Abaya image",
    })),
  });

  await newProduct.save();

  console.log("🚀 ~ product ~ newProduct:", newProduct);
  // console.log("🚀 ~ product ~ newProduct:", newProduct)
  res.status(201).json({
    success: true,
    newProduct,
  });
});

const updateProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, category, model, colors } = req.body;

  // Find the existing product
  let product = await products.findById(id);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  // Handle image uploads if new files are provided
  let imageUrls = product.images;
  if (req.files && req.files.length > 0) {
    imageUrls = await uploadOnCloudinaryTwo(req.files.map((file) => file.path));
    imageUrls = imageUrls.map((url) => ({ url, alt: "Updated product image" }));
  }

  // Update product fields
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.category = category || product.category;
  product.model = model || product.model;
  product.colors = colors ? colors.split(",") : product.colors;
  product.images = imageUrls;

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

const upgradeProducts = catchAsyncError(async (req, res, next) => {
  let Products = products.findById(req.params.id);

  if (!Products) {
    return next(new ErroHandler("Invalid id", 404));
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
const myOrders = catchAsyncError(async (req, res) => {
  const orders = await Order.find({ userId: req.users._id });

  res
    .status(200)
    .json({ success: true, message: "Order get successfully", orders });
});
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
  myOrders,
  product,
};
