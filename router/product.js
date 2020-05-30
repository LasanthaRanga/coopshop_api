const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const prodController = require('../controller/product');
const scon = require('../util/sequl');
const user = scon.import('../models/user');
const prodimage = scon.import('../models/prodimage');

var dateFormat = require('dateformat');
let path = '';
const multer = require('multer');

var fs = require('fs');
var appRoot = require('app-root-path');

const uppath = "../coop.nutrilitesrilanka.com/uploads/product/";
// const uppath = "D:/Project/COOP SHOP/uploads/product/";
//const uppath = "./uploads/product/";
const downpath = "https://coop.nutrilitesrilanka.com/uploads/product/";
// const downpath = "D:/Project/COOP SHOP/uploads/product/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, './uploads/');
        cb(null, uppath);
    },
    filename: function (req, file, cb) {
        let date = dateFormat(new Date(), 'yyyyMMddHHmmss_', 'en-US', '+0530');
        path = date + file.originalname;
        cb(null, path);
    }
});

const upload = multer({ storage: storage });




router.post("/pic_upload", upload.single('attach'), (req, res, next) => {
    console.log(req.file.path);

    console.log(req.body.idproduct + "   pid ==");
    console.log(path + "  path");
    let pp = downpath + path;
    try {
        prodimage.create({
            url: pp,
            status: 1,
            oder: 0,
            product_idproduct: req.body.idproduct,
            other: ''
        }).then(result => {
            res.send(result);
        });
    } catch (error) {
        console.log(error);
    }
});


// router.post("/getAll", prodController.getAllProduct);
router.post("/regProd", prodController.regProd);
router.post("/getImages", prodController.getProductImage);
router.post("/addQty", prodController.addQty);
router.post("/getAllByUser", prodController.getAllProductByUser);
router.post("/getProductByID", prodController.getProductByID);
router.post("/addPrices", prodController.addPrices);
router.post("/updateQty", prodController.updateQty);
router.post("/getAllActiveProd", prodController.getAllActiveProducts);


module.exports = router;