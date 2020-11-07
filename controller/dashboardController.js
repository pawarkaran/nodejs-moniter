const express = require('express');
const router = express.Router();

const authorize = require("../middleware/authorize");
const pool = require("../models/db");

exports.dashboardController = async (req, res, next) => {
    try {
        const user = await pool.query(
            "SELECT user_firstname, user_lastname FROM users WHERE user_id = $1",
            [req.user.id]
        );
        return res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
       return res.status(500).send("Server error Dashbord");
    }
}

