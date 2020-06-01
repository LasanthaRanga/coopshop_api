var nodemailer = require('nodemailer');
const http = require('http');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true, // use SSL
    auth: {
        user: 'coopshopapp@gmail.com',
        pass: 'Lasa2012'
    }
});

const message = "Welcome to COOP SHOP. Youre Verification code is : ";

exports.emailSend = (param) => {

    console.log(param);

    transporter.sendMail(
        {
            from: 'coopshopapp@gmail.com',
            to:  param.to,
            subject: param.subject,
            text:  param.message
        }
        , function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }
    );

    message.replace(" ", "+");
}

exports.smsSend = (req, res, next) => {
    let message = "test";
    let val = "0000";
    let mobile = "0702517628"; 

    http.get("http://www.textit.biz/sendmsg/index.php?id=94767365725&password=1548&text=" + message + val + "&to=" + mobile + "&from=MC.Kurunegala"
        , function (err, res, body) {
            if (err) {
                console.log("eroor on");
                console.log(err);
            } else {
                console.log("Else");
                console.log(res);
            }
        }
    );
}