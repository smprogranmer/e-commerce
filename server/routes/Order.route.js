const { Router } = require("express");
const isAuthenticatedUser = require("../middlewares/auth");
const { createOrder } = require("../controllers/Order.controller");
const router = Router();

// router.use(isAuthenticatedUser)


// router.get('/', createOrder )
router.post('/create', createOrder )



module.exports =  router;
