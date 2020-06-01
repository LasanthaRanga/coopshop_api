const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const mycon = require('../util/conn');
var dateFormat = require('dateformat');
let path = '';
const multer = require('multer');
var fs = require('fs');
var appRoot = require('app-root-path');
const addController = require('../controller/add');

const uppath = "../coopshop.lk/uploads/banar/";
// const uppath = "D:/Project/COOP SHOP/uploads/banar/";
const downpath = "http://coopshop.lk/uploads/banar/";
//const downpath = "D:/Project/COOP SHOP/uploads/banar/";


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
    console.log(path + "  path");
    let pp = downpath + path;
    try {
        mycon.execute("INSERT INTO  `add`(`url`) VALUES ('" + pp + "')", (e, r, f) => {
            if (!e) {
                res.send({ ID: r.insertId, url: pp });
            } else {
                console.log(e);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

router.post("/addTitle", addController.addTitle);
router.post("/gatAdd", addController.getAllAdd);

module.exports = router;