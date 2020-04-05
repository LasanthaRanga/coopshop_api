const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const userController = require('../controller/user');
const scon = require('../util/sequl');
const user = scon.import('../models/user');
const sharp = require('sharp');

var dateFormat = require('dateformat');
let path = '';
const multer = require('multer');

const uploadPath = '../coop.nutrilitesrilanka.com/uploads/profile/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, './uploads/');
        cb(null, uploadPath);
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
router.post("/login_seller", userController.loginSeller);
router.post("/update_user", userController.updateUser);







router.post("/pic_upload", upload.single('attach'), (req, res, next) => {

    console.log("===========");
    let date = dateFormat(new Date(), 'yyyyMMddHHmmss_', 'en-US', '+0530');
    path = date + file.originalname;

    sharp(req.file.path).resize(300, 300).png({
        quality: 72,
        chromeSubsampling: '4.4.4'
    }).toFile(path, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });

 
    console.log("+++++++++++")

    console.log(req.body.user + "   uid ==");
    console.log(path + "  path");
    try {
        user.findOne({
            where: { iduser: req.body.user }
        }).then(user => {
            user.update({
                image: path
            }).then(user => {
                res.send(user);
            });
        });
    } catch (error) {
        console.log(error);
    }


});

module.exports = router;
