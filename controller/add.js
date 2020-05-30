const scon = require('../util/sequl');
const mycon = require('../util/conn');
var dateFormat = require('dateformat');

exports.getAllAdd = exports.login = (req, res, next) => {
    try {
        mycon.execute("select * from add",
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

exports.addTitle = exports.login = (req, res, next) => {
    console.log(req.body.title + req.body.des + req.body.id);
    let date = dateFormat(new Date(), 'yyyy-mm-dd', 'en-US', '+0530');
    try {
        mycon.execute("UPDATE `add` SET `title`='" + req.body.title + "',`description`='" + req.body.des + "',`clickurl`=NULL,`status`=1,`isactive`=1,`date`='" + date + "' WHERE `id`=" + req.body.id,
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}