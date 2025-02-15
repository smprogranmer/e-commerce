const express = require('express')
const { getAllProducts, createProducts, getOneProduct, upgradeProducts, deleteProducts, cloudinaryTest, searchProducts, orders, myOrders, product } = require('../controllers/Products.controllers')
const isAuthenticatedUser = require('../middlewares/auth')
const upload = require('../middlewares/uploadFile')
const uploadTwo = require('../middlewares/multerFileUpload')
// const  authorizeRoles = require('../middlewares/auth')
const Router = express.Router()

Router.get("/my-orders",isAuthenticatedUser,myOrders)
Router.post("/orders",isAuthenticatedUser,orders)


// Router.get('/products',isAuthenticatedUser,getAllProducts)
Router.get('/',getAllProducts)
Router.get('/:id',getOneProduct)
Router.post('/new',uploadTwo,product)
Router.delete('/:id',deleteProducts)
Router.put('/:id',upgradeProducts)
Router.get('/search-products/:searchTerm',searchProducts)
Router.post("/orders",isAuthenticatedUser,orders)


module.exports = Router