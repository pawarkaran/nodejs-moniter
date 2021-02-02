const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken');
const pool = require("../models/db");
const nodemailer = require('nodemailer');
const { body } = require('express-validator');

const { passwordForgotController, passwordResetController  } = require('../controller/passwordController')

const { passwordForgotValidator, passwordResetValidator } = require('../middleware/validators')



// --------------- Forgot Password -------------------
router.put("/forgotpassword", passwordForgotValidator, passwordForgotController)

// ------------------------------------------------------------------

// -------------------------- Reset Password ------------------------
router.put("/resetpassword", passwordResetValidator, passwordResetController)

module.exports = router;


