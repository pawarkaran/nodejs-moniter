const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require("../models/db");
const bcrypt = require("bcrypt");

const { validationResult, body } = require("express-validator");
const nodemailer = require('nodemailer');
require("dotenv").config()
var fs = require('fs');
var handlebars = require('handlebars');




exports.registerController = async (req, res, next) => {
    
    const { companyname, domainname, firstname, lastname, mobile, email, password } = req.body;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      
    try {

        // --------------------------------- Email Checker --------------------------------

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if (user.rows.length > 0) {
            return res.status(401).json("User already exist!");
        }
        // --------------------------------------------------------------------------------

        // ---------------------------------------  EXPRESS VALIDATOR ERROR ------------------------

        const errors = validationResult(req);
        // console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }

        // ------------------------------------------------------------------------------------------  


        // --------------------------- Password Crypting from bcrypt ------------------------- 

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // ------------------------------------------------------------------------------

        const token = jwt.sign(
            {
                companyname,
                domainname,
                firstname,
                lastname,
                mobile,
                email,
                bcryptPassword
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
                expiresIn: '10m'
            }
        );


        // ------------------ Email Template 

        var readHTMLFile = function (path, callback) {
            fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
                if (err) {
                    throw err;
                    callback(err);
                }
                else {
                    callback(null, html);
                }
            });
        };

        readHTMLFile('/home/karan/SERVER/node Js/prac/devops/views/activation.html', function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                username: "KARAN PAWAR TEST",  // parameters 
                CLIENT_URL: process.env.CLIENT_URL,
                token: token

            };
            var htmlToSend = template(replacements);

            const mailOptions = {
                from: process.env.EMAIL_FROM, // sender this is your email here
                to: `${req.body.email}`,//`${req.body.email}`  , // receiver email2
                subject: "Password Reset Link For Incidents Devop's",
                html: htmlToSend
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
 


        });
        console.log('ending');
        return res.json("register mail send")

// --------------------------------------

        // var verify = Math.floor((Math.random() * 10000000) + 1);

        // var mailOptions = {
        //     from: `moniter@devops.com`, // sender this is your email here
        //     to: `${req.body.email}`, // receiver email2
        //     subject: "Account Verification",
        //     html: `<h1> Please Click on this link<h1><br><hr>
        // <br><a href="${process.env.CLIENT_URL}/#/activate/${token}">CLICK ME TO ACTIVATE YOUR ACCOUNT</a>`
        // }
      
        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });

        

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

    res.send('POST /register');
    console.log(req.body);
};
