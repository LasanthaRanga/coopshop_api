const scon = require('../util/sequl');
const cat1 = scon.import('../models/cat1');
const cat2 = scon.import('../models/cat2');

const mycon = require('../util/conn');

exports.addCategory = exports.login = (req, res, next) => {
    try {
        cat1.create({
            cat: req.body.cat,
            status: 1,
            description: req.body.description,
            cat_sinhala: req.body.cat_sinhala
        }).then(result => {
            res.send(result);
        }).error(er => {
            res.send(er);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.addSubCategory = exports.login = (req, res, next) => {
    try {
        cat2.create({
            cat1_idcat1: req.body.cat1_idcat1,
            cat2: req.body.cat2,
            status: 1,
            description: req.body.description,
            cat2_sinhala: req.body.cat2_sinhala
        }).then(result => {
            res.send(result);
        }).error(er => {
            res.send(er);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}




exports.getAllMcat = exports.login = (req, res, next) => {
    try {
        mycon.execute("select * from cat1",
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

exports.getAllScat = exports.login = (req, res, next) => {
    try {
        mycon.execute("select * from cat2",
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

exports.getSubCatByMcat = exports.login = (req, res, next) => {

    try {
        mycon.execute("SELECT cat2.idcat2,cat2.cat2,cat2.`status`,cat2.description,cat2.cat1_idcat1,cat2.createdAt,cat2.updatedAt,cat2.cat2_sinhala FROM cat2 WHERE cat2.cat1_idcat1=" + req.body.mcatid,
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

exports.updateMcat = (req, res, next) => {
    try {
        cat1.findOne({
            where: { idcat1: req.body.idcat1 }
        }).then(cat1 => {
            cat1.update({
                cat: req.body.cat,
                status: 1,
                description: req.body.description,
                cat_sinhala: req.body.cat_sinhala
            }).then(cat1 => {
                res.send(cat1);
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.updateScat = (req, res, next) => {
    try {
        cat1.findOne({
            where: { idcat1: req.body.idcat1 }
        }).then(cat1 => {
            cat1.update({
                cat: req.body.cat,
                status: 1,
                description: req.body.description,
                cat_sinhala: req.body.cat_sinhala
            }).then(cat1 => {
                res.send(cat1);
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.updateScat = (req, res, next) => {

    console.log(req.body.idcat2);

    try {
        cat2.findOne({
            where: { idcat2: req.body.idcat2 }
        }).then(cat2 => {
            cat2.update({
                cat1_idcat1: req.body.cat1_idcat1,
                cat2: req.body.cat2,
                status: 1,
                description: req.body.description,
                cat2_sinhala: req.body.cat2_sinhala
            }).then(cat2 => {
                res.send(cat2);
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
