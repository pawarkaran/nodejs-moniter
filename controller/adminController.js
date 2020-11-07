const express = require('express');
const pool = require('../models/db');
const router = express.Router()
const jwt = require('jsonwebtoken');
const jwtGenerator = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");

const { check, validationResult, body } = require("express-validator");
const nodemailer = require('nodemailer');
require("dotenv").config()

exports.adminRegisterController = async (req, res, next) => {
    console.log('reg start');
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
            console.log('register already');
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
        console.log("pas end");

        const role = 'admin';

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
                expiresIn: '5m'
            }
        );
        console.log("token end");


        // var verify = Math.floor((Math.random() * 10000000) + 1);

        var mailOptions = {
            from: `moniter@devops.com`, // sender this is your email here
            to: `${req.body.email}`, // receiver email2
            subject: "Account Verification",
            html: `<h1> Request For admin<h1><br><hr>
        <h4>Name:${req.body.firstname}, Email: ${req.body.email}: Wants to be admin </h4>
        <h2> Warning by Clicking Below link you give ${req.body.firstname} permission to all database.</h2>

        <br><a href="${process.env.CLIENT_URL}/#/admin/adminverify/${token}">CLICK ME TO ACTIVATE YOUR ACCOUNT</a>`
        }
        console.log("mail sending");
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        console.log("succes");
        //next();
        res.send('succes')

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}
// ----------------------------- Admin Mail Verification ---------------------- 
exports.adminVerifyController = async (req, res, next) => {
    const { email } = req.body;
    console.log('start');
    try {

        // --------------------------------- Email Checker --------------------------------

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if (user.rows.length > 0) {
            return res.status(401).json("User already exist!");
        }

        const { token } = req.body;
        if (token) {
            jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, async (err, decoded) => {
                if (err) {
                    console.log('error activating');
                    return res.status(401).json('Expired link Please Sign up Again');
                } else {
                    const {
                        companyname,
                        domainname,
                        firstname,
                        lastname,
                        mobile,
                        email,
                        bcryptPassword
                    } = jwt.decode(token);

                    console.log(email);

                    const role = 'admin';

                    const newUser = await pool.query(
                        "INSERT INTO users (user_companyname, user_domainname, user_firstname, user_lastname, user_mobile, user_email, user_password, user_role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
                        [companyname, domainname, firstname, lastname, mobile, email, bcryptPassword, role]
                    );
                    //     console.log("jwt");
                    // const jwtToken = jwtGenerator(newUser.rows[0].user_id);

                    console.log(' success')

                    return res.json("Registration Complete")

                    //  return res.json({ jwtToken });
                    // res.redirect('http://localhost:3001/login')
                }

            })

        }
        // next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

}


exports.adminLoginController = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);
        console.log(email);
        if (user.rows.length === 0) {
            return res.status(401).json("Invalid Credential or Register First");
        }

        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].user_password
        );

        if (!validPassword) {
            return res.status(401).json("Invalid User Name or Password");
        }

       
    
        const validrole = await (user.rows[0].user_role)
        console.log(validrole);


        if (validrole === 'admin') {
            // console.log("admin");
            // const jwtToken = jwtGenerator(user.rows);
            const jwtToken = jwtGenerator(user.rows[0].user_id);
            return res.json({ jwtToken });
            // res.status(200).json("You are admin")
            return res.json({ jwtToken });
            return res.status(200).json("You are admin")
            
        } else{
            console.log("not admin");
            return res.status(403).json("You are not admin")
        }

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}
