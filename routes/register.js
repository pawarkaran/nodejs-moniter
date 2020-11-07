const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require("../models/db");
const bcrypt = require("bcrypt");

const { check, validationResult, body } = require("express-validator");
const nodemailer = require('nodemailer');
require("dotenv").config()

const { registerController } = require('../controller/registerController')
const { registerValidator } =require('../middleware/validators')

router.post("/register", registerValidator, registerController)

// email connection 

/* Get Register index /register */
router.get("/register", async (req, res, next) => {
  res.send('/register');
  console.log(req.body);
});

// email connection

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASSWORD
//   }
// });

//  in this verify is table name like users
//database name is email verify

/* POST Register index /register */
// router.post("/register", [
//   check('companyname').not().isEmpty().trim().withMessage('CompanyName must have more than 2 characters').isLength({ min: 2 }),
//   check('domainname', 'DomainName must have more than 2 characters').not().isEmpty().trim().isLength({ min: 2 }),
//   check('firstname', 'FirstName must have more than 2 characters').not().isEmpty().trim().isLength({ min: 2 }),
//   check('lastname', 'FirstName must have more than 2 characters').not().isEmpty().trim().isLength({ min: 2 }),
//   check('mobile', 'Enter valid Mobile No.').not().isEmpty().trim().isLength({ min: 7 }),
//   check('email', 'Enter valid Email or User Already exist').not().isEmpty().trim().isEmail().isLength({ min: 2 }),
//   check('password', 'Password must atleast be 5 character').not().isEmpty().trim().isLength({ min: 5 }),

// ],
//   async (req, res, next) => {

//     const { companyname, domainname, firstname, lastname, mobile, email, password } = req.body;

//     try {

//       // --------------------------------- Email Checker --------------------------------

//       const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
//         email
//       ]);

//       if (user.rows.length > 0) {
//         return res.status(401).json("User already exist!");
//       }
//       // --------------------------------------------------------------------------------

//       // ---------------------------------------  EXPRESS VALIDATOR ERROR ------------------------

//       const errors = validationResult(req);
//       // console.log(req.body);

//       if (!errors.isEmpty()) {
//         return res.status(422).json(errors.array());
//       }

//       // ------------------------------------------------------------------------------------------  


//       // --------------------------- Password Crypting from bcrypt ------------------------- 

//       const salt = await bcrypt.genSalt(10);
//       const bcryptPassword = await bcrypt.hash(password, salt);

//       // ------------------------------------------------------------------------------

//       const token = jwt.sign(
//         {
//           companyname,
//           domainname,
//           firstname,
//           lastname,
//           mobile,
//           email,
//           bcryptPassword
//         },
//         process.env.JWT_ACCOUNT_ACTIVATION,
//         {
//           expiresIn: '5m'
//         }
//       );


//       // var verify = Math.floor((Math.random() * 10000000) + 1);

//       var mailOptions = {
//         from: `moniter@devops.com`, // sender this is your email here
//         to: `${req.body.email}`, // receiver email2
//         subject: "Account Verification",
//         html: `<h1> Please Click on this link<h1><br><hr>
//         <br><a href="${process.env.CLIENT_URL}/activate/${token}">CLICK ME TO ACTIVATE YOUR ACCOUNT</a>`
//       }
//       transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });



//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }

//     res.send('POST /register');
//     console.log(req.body);
//   });



module.exports = router;