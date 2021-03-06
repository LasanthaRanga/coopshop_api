const scon = require('../util/sequl');
const user = scon.import('../models/user');
const utype = scon.import('../models/utype');
const address = scon.import('../models/address')

const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
const mycon = require('../util/conn');
const mail = require('../middleware/email');
const {param} = require('../router/user');


exports.picupload =  (req, res, next) => {
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
        var val = Math.floor(1000 + Math.random() * 9000);

        user.findOne({
            where: {email: req.body.email}
        }).then(u => {
            if (u) {
                console.log(u);
                return res.status(409).json({
                    error: 'This Email Address Alrady Exsist Please Login Or Register With Other Email'
                });
            } else {
                bcript.hash(req.body.pword, 10, (err, hash) => {
                    if (err) {
                        return status(500).json({error: err});
                    } else {
                        user.create({
                            name: req.body.name,
                            email: req.body.email,
                            pword: hash,
                            mobile: req.body.mobile,
                            utype_idutype: 1,
                            status: 0,
                            isactive: 0,
                            other1: val
                        }).then(result => {
                            let param = {
                                subject: 'COOP SHOP Verification',
                                message: 'Welcome to COOP SHOP. Your Verification code is : ' + val,
                                to: req.body.email,
                                mob: req.body.mobile
                            };

                            try {
                                mail.smsSend(param);
                            } catch (error) {
                                console.log(error);
                            }
                            try {
                                mail.emailSend(param);
                            } catch (error) {
                                console.log(error);
                            }

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


exports.customerSignUp = (req, res, next) => {
    try {
        var val = Math.floor(1000 + Math.random() * 9000);

        user.findOne({
            where: {email: req.body.email}
        }).then(u => {
            if (u) {
                console.log(u);
                return res.status(409).json({
                    error: 'This Email Address Alrady Exsist Please Login Or Register With Other Email'
                });
            } else {
                bcript.hash(req.body.pword, 10, (err, hash) => {
                    if (err) {
                        return status(500).json({error: err});
                    } else {
                        user.create({
                            name: req.body.name,
                            email: req.body.email,
                            pword: hash,
                            mobile: req.body.mobile,
                            utype_idutype: 3,
                            status: 0,
                            isactive: 0,
                            other1: val
                        }).then(result => {
                            let param = {
                                subject: 'COOP SHOP Verification',
                                message: 'Welcome to COOP SHOP. Your Verification code is : ' + val,
                                to: req.body.email,
                                mob: req.body.mobile
                            };

                            try {
                                mail.smsSend(param);
                            } catch (error) {
                                console.log(error);
                            }
                            try {
                                mail.emailSend(param);
                            } catch (error) {
                                console.log(error);
                            }


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
            where: {email: req.body.email}
        }).then(use => {
            if (use) {
                bcript.compare(req.body.pword, use.pword, (err, result) => {
                    if (err) {
                        return res.status(401).json({message: 'user name or password is wrong'});
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

            } else {
                return res.status(401).json({message: 'user name or password is wrong'});
            }

        }).catch(error => {
            console.log(error);
            res.send(error);
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.updateUser = (req, res, next) => {
    try {
        user.findOne({
            where: {iduser: req.body.uid}
        }).then(user => {
            user.update({
                branch: req.body.branch,
                member: req.body.member,
                description: req.body.description,
                //  gender: req.bod.gender,
                nic: req.body.nic,
                other1: req.body.other1,
                other2: req.body.other2,
                bussynes: req.body.bussynes,
                nature: req.body.nature,
                tp: req.body.tp
            }).then(user => {
                res.send(user);
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.addAddress = (req, res, next) => {
    try {
        mycon.execute("UPDATE `address` SET `isdiliver` = 0 WHERE `user_iduser` = " + req.body.user_iduser, (e, r, f) => {
            address.create({
                user_iduser: req.body.user_iduser,
                line1: req.body.line1,
                line2: req.body.line2,
                line3: req.body.line3,
                postal_code: req.body.postal_code,
                isdiliver: 1,
                country: req.body.country
            }).then(result => {
                res.send(result);
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.setAsDefaltAddress = (req, res, next) => {
    try {
        mycon.execute("UPDATE `address` SET `isdiliver` = 0 WHERE `user_iduser` = " + req.body.uid, (e, r, f) => {
            mycon.execute("UPDATE `address` SET `isdiliver` = 1 WHERE `user_iduser` = '" + req.body.uid + "' and idaddress = " + req.body.aid, (ee, rr, ff) => {
                res.send(rr);
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getAddress = (req, res, next) => {
    try {
        mycon.execute("SELECT address.idaddress,address.line1,address.line2,address.line3,address.postal_code,address.country," +
            "address.x,address.y,address.`status`,address.isdiliver,address.user_iduser,address.createdAt,address.updatedAt," +
            "distric.distric_sinhala,distric.distric_english,city.city_sinhala,city.city_english,city.drate_iddrate " +
            "FROM address INNER JOIN distric ON distric.iddistric=address.country INNER JOIN " +
            "city ON city.idcity=address.line3 WHERE address.user_iduser= " + req.body.uid,
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

exports.getDefaultAddress = (req, res, next) => {
    try {
        mycon.execute("SELECT address.idaddress,address.line1,address.line2,address.line3,address.postal_code,address.country," +
            "address.x,address.y,address.`status`,address.isdiliver,address.user_iduser,address.createdAt,address.updatedAt," +
            "city.city_english,city.drate_iddrate,distric.distric_english,drate.iddrate,drate.type,drate.firstkg,drate.addkg " +
            "FROM address INNER JOIN city ON city.idcity=address.line3 INNER JOIN distric ON distric.iddistric=address.country " +
            "INNER JOIN drate ON city.drate_iddrate=drate.iddrate WHERE address.isdiliver=1 AND address.user_iduser=" + req.body.uid,
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows[0]);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.active = (req, res, next) => {
    try {
        user.findOne({
            where: {iduser: req.body.uid}
        }).then(user => {
            user.update({
                isactive: req.body.status
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
            mycon.execute("SELECT `user`.iduser,`user`.`name`,`user`.email,`user`.mobile,`user`.branch,`user`.member,`user`.description,`user`.gender, " +
                "`user`.image,`user`.isactive,`user`.`status`,`user`.rating,`user`.nic,`user`.other1,`user`.other2,`user`.utype_idutype, " +
                "`user`.bussynes,`user`.nature,`user`.tp,`user`.createdAt,`user`.updatedAt FROM `user` WHERE `user`.iduser= " + req.body.uid,
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
    console.log('==========================================privilages=============================');
    console.log(req.headers)
    console.log('==========================================privilages=============================');
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

exports.getSellers = (req, res, next) => {
    try {
        let isactive = req.body.isactive;
        let utype = req.body.utype;
        if (isactive === 0 || isactive == 1) {
            mycon.execute("SELECT `user`.iduser,`user`.`name`,`user`.email,`user`.mobile,`user`.branch,`user`.member,`user`.description,`user`.image,`user`.isactive,`user`.`status`,`user`.rating,`user`.nic,`user`.other1,`user`.other2,`user`.utype_idutype,`user`.createdAt,`user`.updatedAt FROM `user` " +
                " WHERE `user`.utype_idutype='" + utype + "' AND `user`.isactive=" + isactive,
                (error, rows, fildData) => {
                    if (!error) {
                        res.send(rows);
                    }
                });
        } else {
            mycon.execute("SELECT `user`.iduser,`user`.`name`,`user`.email,`user`.mobile,`user`.branch,`user`.member,`user`.description,`user`.image,`user`.isactive,`user`.`status`,`user`.rating,`user`.nic,`user`.other1,`user`.other2,`user`.utype_idutype,`user`.createdAt,`user`.updatedAt FROM `user` " +
                " WHERE `user`.utype_idutype= " + utype,
                (error, rows, fildData) => {
                    if (!error) {
                        res.send(rows);
                    }
                });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.emailVerify = (req, res, next) => {
    try {
        user.findOne({
            where: {email: req.body.email}
        }).then(use => {
            if (use.other1 === req.body.code) {
                use.update({
                    status: 1
                }).then(use => {
                    res.send({mg: 'ok'});
                });
            } else {
                res.send({mg: 'no'});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getDistrics = (req, res, next) => {
    try {
        mycon.execute("SELECT distric.iddistric, distric.distric_sinhala, distric.distric_english FROM distric",
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

exports.getDistricById = (req, res, next) => {
    try {
        mycon.execute("SELECT distric.iddistric, distric.distric_sinhala, distric.distric_english FROM distric WHERE iddistric =" + req.body.id,
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

exports.getCitys = (req, res, next) => {
    try {
        mycon.execute("SELECT city.idcity,city.city_sinhala,city.city_english,city.distric_iddistric,city.drate_iddrate FROM city WHERE city.distric_iddistric=" + req.body.iddistric,
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

exports.getCityById = (req, res, next) => {
    try {
        mycon.execute("SELECT city.idcity,city.city_sinhala,city.city_english,city.city_status,city.distric_iddistric,city.drate_iddrate FROM city WHERE city.idcity= " + req.body.id,
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


exports.getDRate = (req, res, next) => {
    try {
        mycon.execute("SELECT drate.iddrate,drate.type,drate.firstkg,drate.addkg FROM drate WHERE drate.iddrate=" + req.body.drate_iddrate,
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


exports.cartProductCount = (req, res, next) => {
    try {
        mycon.execute("SELECT Sum(carthasprod.qty) AS qty,cart.idcart,cart.user_iduser,cart.`status` FROM cart " +
            " INNER JOIN carthasprod ON carthasprod.cartid=cart.idcart WHERE cart.user_iduser= " + req.body.uid +
            " AND cart.`status`=0 GROUP BY cart.idcart",
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

exports.myOders = (req, res, next) => {
    try {
        mycon.execute("SELECT oder.id,oder.cart_id,oder.cus_id,oder.seller_id,oder.prod_id,oder.qty,oder.confirm_date," +
            "oder.tracking_no,oder.tracking_info,oder.shiped_date,oder.recived_date,oder.recived_info,oder.`status`," +
            "oder.status_text,product.idproduct,product.`name`,product.`code`,product.description,product.gender," +
            "product.`status`,product.others,product.rating,product.user_iduser,product.cat1_idcat1,product.cat2_idcat2," +
            "product.createdAt,product.updatedAt,product.name_s,product.description_s,product.price,product.disrate," +
            "product.disval,product.selling,product.netprice,product.commition,product.weight,prodimage.url " +
            "FROM oder INNER JOIN product ON product.idproduct=oder.prod_id INNER JOIN prodimage ON " +
            "prodimage.product_idproduct=product.idproduct WHERE oder.cus_id= '" + req.body.cusid + "' " +
            "GROUP BY oder.id,product.idproduct",
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

exports.allOders = (req, res, next) => {
    try {
        mycon.execute("SELECT oder.id,oder.cart_id,oder.cus_id,oder.seller_id,oder.prod_id,oder.qty,oder.confirm_date," +
            "oder.tracking_no,oder.tracking_info,oder.shiped_date,oder.recived_date,oder.recived_info,oder.`status`," +
            "oder.status_text,product.idproduct,product.`name`,product.`code`,product.description,product.gender," +
            "product.`status`,product.others,product.rating,product.user_iduser,product.cat1_idcat1,product.cat2_idcat2," +
            "product.createdAt,product.updatedAt,product.name_s,product.description_s,product.price,product.disrate," +
            "product.disval,product.selling,product.netprice,product.commition,product.weight,prodimage.url " +
            "FROM oder INNER JOIN product ON product.idproduct=oder.prod_id INNER JOIN prodimage ON " +
            "prodimage.product_idproduct=product.idproduct " +
            "GROUP BY oder.id,product.idproduct",
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

exports.myDiliver = (req, res, next) => {
    try {
        mycon.execute("SELECT oder.id,oder.cart_id,oder.cus_id,oder.seller_id,oder.prod_id,oder.qty,oder.confirm_date," +
            "oder.tracking_no,oder.tracking_info,oder.shiped_date,oder.recived_date,oder.recived_info,oder.`status`," +
            "oder.status_text,product.idproduct,product.`name`,product.`code`,product.description,product.gender," +
            "product.`status`,product.others,product.rating,product.user_iduser,product.cat1_idcat1,product.cat2_idcat2," +
            "product.createdAt,product.updatedAt,product.name_s,product.description_s,product.price,product.disrate," +
            "product.disval,product.selling,product.netprice,product.commition,product.weight,prodimage.url " +
            "FROM oder INNER JOIN product ON product.idproduct=oder.prod_id INNER JOIN prodimage ON " +
            "prodimage.product_idproduct=product.idproduct WHERE oder.seller_id = '" + req.body.uid + "' " +
            "GROUP BY oder.id,product.idproduct",
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


exports.mail = (req, res, next) => {
    mail.emailSend(req, res, next);
    mail.smsSend(req, res, next);
    res.send({'OK': 'DONE'});
}
