const scon = require('../util/sequl');
const mycon = require('../util/conn');
var dateFormat = require('dateformat');

const cart = scon.import('../models/cart');
const chp = scon.import('../models/carthasprod');


const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
const mail = require('../middleware/email');

exports.getSubCatByMcat = exports.login = (req, res, next) => {

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


exports.addToCart = exports.login = (req, res, next) => {
    const uid = req.body.uid;
    const pid = req.body.pid;
    const qty = req.body.qty;
    const selling = req.body.selling;
    let total = qty * selling;
    let cartid = 0;
    var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    console.log(day);
    try {
        mycon.execute("SELECT cart.idcart, cart.user_iduser, cart.`status` FROM cart WHERE cart.user_iduser = '" + uid + "' AND cart.`status` = 0",
            (error, rows, fildData) => {
                if (!error) {
                    console.log(rows)
                    if (rows.length > 0) {
                        cartid = rows[0].idcart;
                        console.log(cartid);
                        //  res.send(rows[0]);

                        mycon.execute("SELECT carthasprod.idCarthasprod,carthasprod.cartid,carthasprod.prodid,carthasprod.qty FROM carthasprod " +
                            "WHERE carthasprod.cartid= " + cartid + " AND carthasprod.prodid=" + pid, (ee, rr, ff) => {
                                if (!ee) {
                                    if (rr.length > 0) {
                                        chpid = rr[0].idCarthasprod;
                                        mycon.execute("UPDATE `carthasprod` SET `qty`=" + qty + " WHERE `idCarthasprod`=" + chpid, (er, ro, fi) => {
                                            if (!er) {
                                                res.send(ro);
                                            } else {
                                                console.log(er);
                                                res.send(er);
                                            }
                                        });
                                    } else {
                                        mycon.execute("INSERT INTO `carthasprod` ( `cartid`, `prodid`, `qty`,  `diliverstatus`, `diliverstatusstring`) VALUES ( " + cartid + ", " + pid + ", " + qty + ",  0, NULL)", (ee, rr, ff) => {
                                            if (!ee) {
                                                res.send(rr);
                                            } else {
                                                res.send(ee);
                                            }
                                        });
                                    }
                                } else { console.log(ee); }
                            });
                    } else {
                        //  res.send('null');
                        mycon.execute("INSERT INTO `cart` (`user_iduser`, `status`, `statusstring`, `total`, `createdAt`, `updatedAt`) VALUES ( " + uid + ", '0', 'Pending', '0', '" + day + "', '" + day + "')", (e, r, f) => {
                            if (!e) {
                                let cartid = r.insertId;
                                console.log(cartid);
                                mycon.execute("INSERT INTO `carthasprod` ( `cartid`, `prodid`, `qty`,  `diliverstatus`, `diliverstatusstring`) VALUES ( " + cartid + ", " + pid + ", " + qty + ",  0, NULL)", (ee, rr, ff) => {
                                    if (!ee) {
                                        res.send(rr);
                                    } else {
                                        // console.log(ee);
                                        res.send(ee);
                                    }
                                });
                            } else {
                                console.log('-------------')
                                console.log(e);
                                res.send(e);
                            }
                        });
                    }
                } else {
                    console.log(error);
                    res.send(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getCartByUser = (req, res, next) => {
    let uid = req.body.uid;
    try {
        mycon.execute("SELECT cart.idcart,cart.statusstring,cart.total,carthasprod.idCarthasprod,carthasprod.cartid,carthasprod.prodid,carthasprod.qty AS cartqty,"
            + "carthasprod.oneprice,carthasprod.allprice,carthasprod.diliverstatus,carthasprod.diliverstatusstring,product.idproduct,product.`name`,product."
            + "`code`,product.description,product.gender,product.others,product.rating,product.cat1_idcat1,product.cat2_idcat2,product.name_s,product."
            + "description_s,product.qty,product.price,product.disrate,product.disval,product.selling,product.netprice,product.commition,prodimage.url,product."
            + "`status`,product.user_iduser, product.weight FROM cart INNER JOIN carthasprod ON carthasprod.cartid=cart.idcart INNER JOIN product ON carthasprod.prodid=product."
            + "idproduct LEFT JOIN prodimage ON prodimage.product_idproduct=product.idproduct WHERE cart.`status`=0 AND cart.user_iduser=" + uid+ " GROUP BY product.idproduct", (er, ro, fi) => {
                if (!er) {
                    res.send(ro);
                } else {
                    console.log(er);
                    res.send(er);
                }
            });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}


exports.updateQty = (req, res, next) => {
    let uid = req.body.uid;
    try {
        mycon.execute("UPDATE `carthasprod` SET `qty`= " + req.body.qty + "  WHERE `idCarthasprod`= " + req.body.id_chp, (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            } else {
                console.log(er);
                res.send(er);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}


exports.removeFromCart = (req, res, next) => {
    let uid = req.body.uid;
    try {
        mycon.execute("DELETE FROM `carthasprod`  WHERE `idCarthasprod`=" + req.body.id_chp, (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            } else {
                console.log(er);
                res.send(er);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}
