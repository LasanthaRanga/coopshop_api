const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const categoryController = require('../controller/category');


router.post("/addMainCat", checkAuth, categoryController.addCategory);
router.post("/addSubCategory", checkAuth, categoryController.addSubCategory);
router.post("/updateMcat", checkAuth, categoryController.updateMcat);
router.post("/updateScat", checkAuth, categoryController.updateScat);
router.post("/getAllMcat", categoryController.getAllMcat);
router.post("/getAllScat", categoryController.getAllScat);
router.post("/getSubCatByMcat", categoryController.getSubCatByMcat);
router.post("/getSelectedMcat", categoryController.getSelectedMcat);
router.post("/getSelectedScat", categoryController.getSelectedScat);
router.post("/getMcatRate", categoryController.getMcatRate);

module.exports = router;