const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const pool = require("../models/db");
require("dotenv").config()

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    pool: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  






module.exports = router;