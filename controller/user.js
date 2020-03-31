const scon = require('../util/sequl');
const user = scon.import('../models/user');
const utype = scon.import('../models/utype');

const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
const mycon = require('../util/conn');





exports.picupload =  





exports.login = (req, res, next) => {
    try {
        mycon.execute("select * from user",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.sellerSignUp = (req, res, next) => {
    try {

        user.findOne({
            where: { email: req.body.email }
        }).then(u => {
            if (u) {
                console.log(u);
                return res.status(409).json({
                    error: 'This Email Address Alrady Exsist Please Login Or Register With Other Email'
                });
            } else {
                bcript.hash(req.body.pword, 10, (err, hash) => {
                    if (err) {
                        return status(500).json({ error: err });
                    } else {
                        user.create({
                            name: req.body.name,
                            email: req.body.email,
                            pword: hash,
                            mobile: req.body.mobile,
                            utype_idutype: 1,
                            status: 0
                        }).then(result => {
                            res.send(result);
                        });
                    }
                });
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.loginSeller = (req, res, next) => {
    try {

        user.findOne({
            where: { email: req.body.email }
        }).then(use => {
            bcript.compare(req.body.pword, use.pword, (err, result) => {
                if (err) {
                    return res.status(401).json({ message: 'user name or password is wrong' });
                }
                if (result) {
                    const token = jwt.sign({
                        uid: use.iduser,
                        name: use.name,
                        nic: use.nic,
                        mobile: use.mobile,
                        image: use.image
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        },
                    );
                    return res.status(200).json({
                        mg: "Auth Successfull",
                        token: token
                    });
                }
            });
        });





    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}