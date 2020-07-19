const scon = require('../util/sequl');
const product = scon.import('../models/product');
const prodimage = scon.import('../models/prodimage');


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
            others: req.body.others,
            qty: req.body.qty,
            price: req.body.allsale,
            disrate: req.body.disRate,
            disval: req.body.disVal,
            selling: req.body.selling,
            netprice: req.body.netprice,
            commition: req.body.commition,
            weight: req.body.weight
        }).then(result => {
            res.send(result);
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getProductImage = (req, res, next) => {
    try {
        let idprod = req.body.idproduct
        mycon.execute("SELECT prodimage.idprodimage,prodimage.url,prodimage.product_idproduct FROM prodimage WHERE prodimage.`status`=1 AND prodimage.product_idproduct=" + idprod,
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


exports.getAllProductByUser = (req, res, next) => {
    console.log(req.body.uid);
    try {
        mycon.execute("SELECT product.idproduct,product.`name`,product.`code`,product.description,product.gender,product.`status`," +
            "product.others,product.rating,product.user_iduser,product.cat1_idcat1,product.cat2_idcat2,product.createdAt," +
            "product.updatedAt,product.name_s,product.description_s,product.qty,product.price,product.disrate,product.disval,product.weight," +
            "product.selling,product.netprice,product.commition,prodimage.url " +
            "FROM product LEFT JOIN prodimage ON prodimage.product_idproduct=product.idproduct " +
            "WHERE product.user_iduser = " + req.body.uid +
            " GROUP BY product.idproduct", (error, rows, fildData) => {
            if (!error) {
                res.send(rows);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getProductByID = (req, res, next) => {

    try {
        mycon.execute("SELECT product.idproduct,product.`name`,product.`code`,product.description,product.gender,product.`status`,product.others," +
            "product.rating,product.user_iduser,product.cat1_idcat1,product.cat2_idcat2,product.createdAt,product.updatedAt,product.name_s," +
            "product.description_s,product.qty,product.price,product.disrate,product.disval,product.selling,product.netprice,product.commition,product.weight," +
            "prodimage.url FROM product LEFT JOIN prodimage ON prodimage.product_idproduct=product.idproduct WHERE " +
            "product.idproduct= " + req.body.prodid +
            " GROUP BY product.idproduct", (error, rows, fildData) => {
            if (!error) {
                res.send(rows);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.activateProd = (req, res, next) => {
    try {
        mycon.execute("UPDATE `product` SET `status`= " + req.body.status + " WHERE `idproduct`=" + req.body.pid, (error, rows, fildData) => {
            if (!error) {
                res.send(rows);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.addQty = (req, res, next) => {
    console.log(req.body);
    try {
        stock.create({
            product_idproduct: req.body.product_idproduct,
            user_iduser: req.body.user_iduser,
            qty: req.body.qty,
            allsale: req.body.allsale
        }).then(result => {
            res.send(result);
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getAllActiveProducts = (req, res, next) => {
    try {
        mycon.execute("SELECT product.idproduct,product.`name`,product.`code`,product.description,product.gender,product.`status`," +
            "product.others,product.rating,product.user_iduser,product.cat1_idcat1,product.cat2_idcat2,product.createdAt," +
            "product.updatedAt,product.name_s,product.description_s,product.qty,product.price,product.disrate,product.disval," +
            "product.selling,product.netprice,product.commition,product.weight,prodimage.url FROM product " +
            "LEFT JOIN prodimage ON prodimage.product_idproduct=product.idproduct WHERE product.`status`=1 " +
            "GROUP BY product.idproduct ORDER BY product.rating DESC", (error, rows, fildData) => {
            if (!error) {
                res.send(rows);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getProduct4adds = (req, res, next) => {
    try {
        mycon.execute("SELECT product.idproduct,product.`name`,product.`code`,product.description,product.gender," +
            "product.`status`,product.others,product.rating,product.user_iduser,product.cat1_idcat1," +
            "product.cat2_idcat2,product.createdAt,product.updatedAt,product.name_s,product.description_s," +
            "product.qty,product.price,product.disrate,product.disval,product.selling,product.netprice," +
            "product.commition,product.weight,prodimage.url " +
            "FROM product LEFT JOIN prodimage ON prodimage.product_idproduct=product.idproduct " +
            "WHERE product.`status`=1 GROUP BY product.idproduct ORDER BY product.rating DESC LIMIT 4", (error, rows, fildData) => {
            if (!error) {
                res.send(rows);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getProductByMcat = (req, res, next) => {
    try {
        let mcatid = req.body.id;
        mycon.execute("SELECT product.idproduct,product.`name`,product.`code`,product.description,product.gender,product.`status`," +
            "product.others,product.rating,product.user_iduser,product.cat1_idcat1,product.cat2_idcat2,product.createdAt,product.updatedAt," +
            "product.name_s,product.description_s,product.qty,product.price,product.disrate,product.disval,product.selling,product.netprice," +
            "product.commition,product.weight,prodimage.url " +
            "FROM product LEFT JOIN prodimage ON prodimage.product_idproduct=product.idproduct " +
            "WHERE product.`status`=1 AND product.cat1_idcat1= '" + mcatid + "' " +
            "GROUP BY product.idproduct ORDER BY product.rating DESC", (error, rows, fildData) => {
            if (!error) {
                res.send(rows);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


