const scon = require('../util/sequl');
const user = scon.import('../models/user');
const utype = scon.import('../models/utype');

const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
const mycon = require('../util/conn');





exports.picupload = exports.login = (req, res, next) => {
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
                        image: use.image,
                        uType: use.utype_idutype
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


exports.updateUser = (req, res, next) => {
    try {
        user.findOne({
            where: { iduser: req.body.uid }
        }).then(user => {
            user.update({
                branch: req.body.branch,
                member: req.body.member,
                description: req.body.description,
                gender: req.bod.gender,
                nic: req.body.nic,
                other1: req.body.other1,
                other2: req.body.other2,
            }).then(user => {
                res.send(user);
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getUserById = (req, res, next) => {
    try {
        try {
            mycon.execute("SELECT `user`.iduser,`user`.`name`,`user`.email,`user`.mobile,`user`.branch,`user`.member,`user`.description,`user`.gender,`user`.image," +
                " `user`.isactive,`user`.`status`,`user`.rating,`user`.nic,`user`.other1,`user`.other2,`user`.utype_idutype,`user`.createdAt,`user`.updatedAt " +
                " FROM `user` WHERE `user`.iduser= " + req.body.uid,
                (error, rows, fildData) => {
                    if (!error) {
                        res.send(rows[0]);
                    }
                });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getPrivilages = (req, res, next) => {
    try {
        console.log('user ' + req.body.usertype);
        mycon.execute("SELECT privilages.id,privilages.title,privilages.url,privilages.icon,privilages.`status`,privilages.utype FROM privilages WHERE privilages.`status`=1 AND privilages.utype=" + req.body.usertype,
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
