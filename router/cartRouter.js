const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const cart = require('../controller/cart');


router.post("/getAll",  cart.getSubCatByMcat);
router.post("/addToCart", cart.addToCart);


module.exports = router;