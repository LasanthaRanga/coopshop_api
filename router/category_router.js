const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const categoryController = require('../controller/category');


router.post("/addMainCat", checkAuth, categoryController.addCategory);
router.post("/addSubCategory", checkAuth, categoryController.addSubCategory);
router.post("/getAllMcat", categoryController.getAllMcat);
router.post("/getAllScat", categoryController.getAllScat);
router.post("/getSubCatByMcat", categoryController.getSubCatByMcat);


module.exports = router;