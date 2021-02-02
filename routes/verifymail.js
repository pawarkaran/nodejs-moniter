const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require("../models/db");

const { verifymailController } = require('../controller/verifymailController')
const { verifymailValidator } = require('../middleware/validators')
 
router.post("/", verifymailValidator, verifymailController)

module.exports = router;
