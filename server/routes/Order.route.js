const { Router } = require("express");
const isAuthenticatedUser = require("../middlewares/auth");
const { createOrder, getAllOrders } = require("../controllers/Order.controller");
const router = Router();

// router.use(isAuthenticatedUser)


router.get('/', getAllOrders)
router.post('/create', createOrder )



module.exports =  router;
