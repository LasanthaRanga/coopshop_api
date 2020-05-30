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
            commition: req.body.commition
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
    try {
        mycon.execute("SELECT product.idproduct,product.`name`,product.`code`,product.description,product.gender,product.`status`," +
            "product.others,product.rating,product.user_iduser,product.cat1_idcat1,product.cat2_idcat2,product.createdAt," +
            "product.updatedAt,product.name_s,product.description_s,product.qty,product.price,product.disrate,product.disval," +
            "product.selling,product.netprice,product.commition,prodimage.url " +
            "FROM product INNER JOIN prodimage ON prodimage.product_idproduct=product.idproduct " +
            "WHERE product.user_iduser=1 " +
            "GROUP BY product.idproduct", (error, rows, fildData) => {
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
            "product.description_s,product.qty,product.price,product.disrate,product.disval,product.selling,product.netprice,product.commition," +
            "prodimage.url FROM product INNER JOIN prodimage ON prodimage.product_idproduct=product.idproduct WHERE " +
            "product.idproduct= " + req.body.prodid +
            "GROUP BY product.idproduct", (error, rows, fildData) => {
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
        mycon.execute("SELECT product.idproduct, product.`name`, product.`code`, product.description, product.gender, " +
            "product.`status`, product.others, product.rating, product.user_iduser, product.cat1_idcat1, " +
            "product.cat2_idcat2, product.createdAt, product.updatedAt, product.name_s, " +
            "product.description_s, prodimage.url, prodimage.idprodimage, prodimage.`status`, " +
            "stock.idstock, stock.product_idproduct, stock.user_iduser, stock.qty, stock.allsale, " +
            "stock.retail, stock.discount, stock.disrate, stock.selling, stock.m_date, stock.ex_date, " +
            "stock.has_discount, stock.`status`, stock.other, stock.createdAt, stock.updatedAt " +
            "FROM product LEFT JOIN prodimage ON prodimage.product_idproduct = product.idproduct " +
            "INNER JOIN stock ON stock.product_idproduct = product.idproduct " +
            "WHERE stock.`status` = 1 AND stock.qty > 0 GROUP BY product.idproduct ORDER BY stock.idstock DESC", (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

