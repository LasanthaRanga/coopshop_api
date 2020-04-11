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

//const uppath = "../coop.nutrilitesrilanka.com/uploads/";
const uppath = "./uploads/profile/";
const downpath = "/uploads/";

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
router.post("/login_seller", userController.loginSeller);
router.post("/update_user", userController.updateUser);
router.post("/getUserById",checkAuth, userController.getUserById);







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

router.get('/propic/:path', (req, res, next) => {
    let url = downpath + 'profile/' + req.params.path;
    console.log(appRoot + uppath);

    let filepath =  url;
    let xx = fs.readFileSync(filepath, 'base64');

    res.send({ xx });

});



module.exports = router;
