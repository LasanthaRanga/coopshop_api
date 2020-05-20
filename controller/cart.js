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
                        res.send(rows[0]);
                    } else {
                        //  res.send('null');
                        mycon.execute("INSERT INTO `cart` ( `user_iduser`, `status`, `statusstring`, `total`, `createdAt`, `updatedAt`) VALUES ( " + uid + ", 0, 'Pending', 0, '" + day + "', '" + day + "')", (e, r, f) => {
                            if (!e) {
                                let cartid = r.insertId;
                                console.log(cartid);
                                mycon.execute("INSERT INTO `carthasprod` ( `cartid`, `prodid`, `qty`,  `diliverstatus`, `diliverstatusstring`) VALUES ( " + cartid + ", " + pid + ", " + qty + ",  0, NULL)", (ee, rr, ff) => {
                                    if (!ee) {
                                        res.send(rr);
                                    } else {
                                        res.send(ee);
                                    }
                                });
                            } else {
                                res.send(e);
                            }
                        });
                    }
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
