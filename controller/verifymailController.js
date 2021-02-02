const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require("../models/db");

exports.verifymailController = async (req, res, next) => {
    const { email } = req.body;
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


                    const newUser = await pool.query(
                        "INSERT INTO users (user_companyname, user_domainname, user_firstname, user_lastname, user_mobile, user_email, user_password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                        [companyname, domainname, firstname, lastname, mobile, email, bcryptPassword]
                    );
                    //     console.log("jwt");
                    // const jwtToken = jwtGenerator(newUser.rows[0].user_id);
                        
                    console.log(' success')
                    return res.send.json("Verification complete")

                    //  return res.json({ jwtToken });
                    // res.redirect('http://localhost:3001/login')
                }

            })

        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

}