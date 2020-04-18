const scon = require('../util/sequl');
const product = scon.import('../models/product');
const prodimage = scon.import('../models/prodimage');
const stock = scon.import('../models/stock');

const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
const mycon = require('../util/conn');


exports.regProd = (req, res, next) => {

    console.log(req.body);

    try {
        product.create({
            name: req.body.name,
            description: req.body.description,
            status: 0,
            user_iduser: req.body.user_iduser,
            cat1_idcat1: req.body.cat1_idcat1,
            cat2_idcat2: req.body.cat2_idcat2,
            name_s: req.body.name_s,
            description_s: req.body.description_s,
            gender: req.body.gender,
            others: req.body.others
        }).then(result => {
            res.send(result);
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getAllProduct = (req, res, next) => {
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

