const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const userController = require('../controller/user');
const scon = require('../util/sequl');
const user = scon.import('../models/user');

var dateFormat = require('dateformat');
let path = '';
const multer = require('multer');
// const sharp = require('sharp');
var fs = require('fs');
var appRoot = require('app-root-path');


const uppath = "../public_html/uploads/profile/";
//ෆෆconst uppath = "./uploads/profile/";
const downpath = "https://www.coopshop.lk/uploads/profile/";

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




router.get("/login", userController.login);
router.post("/signup_seller", userController.sellerSignUp);
router.post("/customer_SignUp", userController.customerSignUp);
router.post("/login_seller", userController.loginSeller);
router.post("/update_user", userController.updateUser);
router.post("/getUserById", checkAuth, userController.getUserById);
router.post("/getPrivilages", userController.getPrivilages);
router.post("/getSellers", userController.getSellers);
router.post("/emailVerify", userController.emailVerify);
router.post("/addAddress", userController.addAddress);
router.post("/getAddress", userController.getAddress);
router.post("/getDefaultAddress", userController.getDefaultAddress);
router.post("/setDefault", userController.setAsDefaltAddress);
router.post("/active", userController.active);
router.post("/getDRate", userController.getDRate);
router.post("/getQty", userController.cartProductCount);
router.post("/getDistrics", userController.getDistrics);
router.post("/getDistrics", userController.getDistricById);
router.post("/getCitys", userController.getCitys);
router.post("/getCitys", userController.getCityById);
router.post("/myOders", userController.myOders);
router.post("/allOders", userController.allOders);
router.post("/myDiliver", userController.myDiliver);



router.post("/pic_upload", upload.single('attach'), (req, res, next) => {
    console.log(req.file.path);
    try {





        // sharp(req.file.path).resize(350, 350).png({
        //     quality: 72,
        //     chromaSubsampling: '4:4:4'
        // }).toFile(uppath + 'profile/' + path, (err, info) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log(info);
        //         fs.unlink(req.file.path, function (err) {
        //             if (err) throw err;
        //             console.log('File deleted!');
        //         });
        //     }
        // })
    } catch (error) {
        console.log(error);
    }
    console.log(req.body.user + "   uid ==");
    console.log(path + "  path");
    let pp = downpath + path;
    try {
        user.findOne({
            where: { iduser: req.body.user }
        }).then(user => {
            user.update({
                image: pp
            }).then(user => {
                res.send(user);
            });
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/propic/:path', (req, res, next) => {
    let url = downpath + 'profile/' + req.params.path;
    console.log(appRoot + uppath);

    let filepath = url;
    let xx = fs.readFileSync(filepath, 'base64');

    res.send({ xx });

});



module.exports = router;
