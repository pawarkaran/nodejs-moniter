const express = require('express');
const router = express.Router();
const validInfo = require("../middleware/validInfo");


const pool = require("../models/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");




exports.loginController = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

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
        // ------------------- Role Checker --------
        const validrole = await (user.rows[0].user_role)
        // console.log(validrole);


        if (validrole === 'admin') {
            // console.log("admin");        
            return res.status(402).json("Oops")

        } else {
           
            const jwtToken = jwtGenerator(user.rows[0].user_id);
            return res.json({ jwtToken });
        }
        // -----------------------------------
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }



    res.send('POST /login');
    console.log(req.body);
};