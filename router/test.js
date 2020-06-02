const express = require('express');
const router = express.Router();
const mail = require('../middleware/email');



router.post("/testEmail", (req, res, fild) => {
    try {
        console.log("==================body --");
        console.log(req.body);
        console.log("==================body end");
    
        mail.emailSend(req.body);
        res.send('OK');
    } catch (error) {
        console.log(error);
    }
  

});

module.exports = router;