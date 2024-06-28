const { Router } = require("express");
const isAuthenticatedUser = require("../middlewares/auth");
const { addToCart, fetchCartProduct, productRemovefromCart, removeAllCart } = require("../controllers/Cart.controller");
const { upgradeProductCart } = require("../controllers/Cart.controller");

console.log('sdfkls' + addToCart); // Should not be undefined

const router = Router();

router.use(isAuthenticatedUser)


router.delete("/removeAllCart",removeAllCart)

router
  // Get all products in the cart
  .get("/", fetchCartProduct)
  // Add a product to the cart
  .post("/addToCard", addToCart)
  // Remove a product from the cart
  .delete("/:id", productRemovefromCart)
  // Upgrade a product in the cart
  .put("/upgradeCart/:id" , upgradeProductCart)


module.exports =  router;
