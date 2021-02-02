const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const pool = require("../models/db");
const nodemailer = require('nodemailer');
const { body } = require('express-validator');
const hbs = require('nodemailer-handlebars');
var handlebars = require('handlebars');
var smtpTransport = require('nodemailer-smtp-transport');


var fs = require('fs');




// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD
//     }
// });

// var readHTMLFile = function (path, callback) {
//     fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
//         if (err) {
//             throw err;
//             callback(err);
//         }
//         else {
//             callback(null, html);
//         }
//     });
// };

// readHTMLFile('/home/karan/SERVER/node Js/prac/devops/views/test.html', function (err, html) {
//     var template = handlebars.compile(html);
//     var replacements = {
//         username: "KARAN PAWAR",  // parameters 
//         CLIENT_URL: process.env.CLIENT_URL

//     };
//     var htmlToSend = template(replacements);

//     const mailOptions = {
//         from: process.env.EMAIL_FROM, // sender this is your email here
//         to: `karannodemailer@gmail.com`, // receiver email2
//         subject: "Password Reset Link",
//         text: 'Wooohooo it works!!',
//         html: htmlToSend  
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
//     //  var replacements = {
//     //      username: "John Doe"
//     // };
//     // var htmlToSend = template(replacements);


// });








// ------------------- Forgot Password ----------------------
exports.passwordForgotController = async (req, res, next) => {
    console.log('start');
    console.log(req.body);
    const { email } = req.body

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });



    try {
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if (user.rows.length === 0) {
            return res.status(401).json("User Does not exists");
        }

        // console.log('unnec calling serever for jwt')

        const token = jwt.sign(
            {
                _id: user._id
            },
            process.env.JWT_RESET_PASSWORD,
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

        readHTMLFile('/home/karan/SERVER/node Js/prac/devops/views/test.html', function (err, html) {
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

        // --------------------------------------

        // const mailOptions = {
        //     from: process.env.EMAIL_FROM, // sender this is your email here
        //     to: `${req.body.email}`, // receiver email2
        //     subject: "Password Reset Link",



        //     //     html: `<h1> Please Click on this link<h1><br><hr>
        //     // <br><a href="${process.env.CLIENT_URL}/password/resetpassword/${token}">CLICK HERE TO RESET YOUR PASSWORD</a>`
        //     // }
        // }
        // console.log('end');
        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });
        // console.log('en2');


        // const user1 = { resetpassword : token }
        const password1 = token;
        const newuser = await pool.query(
            "UPDATE users SET user_resetpasswordlink = $1 WHERE user_email = $2 RETURNING *",
            [password1, email]
        );
        console.log('data entry');
        return res.json("Please Check Your Email Id");



    } catch (err) {
        // console.error(err.message);
        res.status(500).send("Server error");
    }
}
// ---------------------------------------------------------

// ------------------ Reset Password ----------------

exports.passwordResetController = async (req, res, next) => {
    console.log(' start');
    console.log(req.body);

    const { resetpasswordlink } = req.body;


    if (resetpasswordlink) {
        // console.log(' reset');
        jwt.verify(resetpasswordlink, process.env.JWT_RESET_PASSWORD, async function (err, decoded) {
            console.log('reset link verification');
            if (err) {
                return res.status(400).json('Expired link. Try again');
            }

            // console.log('reset link verification2');

            // const resetpasswordlink = req.body;
            // console.log(req.body);
            const user = await pool.query("SELECT * FROM users WHERE user_resetpasswordlink = $1", [
                resetpasswordlink
            ], async (err, user) => {
                if (err || !user) {
                    return res.status(400).json('Something went wrong. Try later');
                }
                const resetpasswordlink = req.body.resetpasswordlink;
                console.log(resetpasswordlink);

                const newpassword = req.body.newPassword;

                // ----------------------- Bcrypt Password ----------------
                const salt = await bcrypt.genSalt(10);
                const bcryptPassword = await bcrypt.hash(newpassword, salt);
                // -------------------------------------------------------
                console.log(newpassword);
                console.log(bcryptPassword);

                const newuser = await pool.query(
                    "UPDATE users SET user_password = $1 WHERE user_resetpasswordlink = $2 RETURNING *",
                    [bcryptPassword, resetpasswordlink]
                );

                const empty = null;
                const resetLink = await pool.query("UPDATE users SET user_resetpasswordlink = $1 where user_resetpasswordlink = $2 RETURNING *",
                    [empty, resetpasswordlink]
                );
            }
            );



            console.log('data entry for new password');


            return res.json("done changes password")

        })

    }  else {
        res.status(500).send("Server error");
    }
    
}