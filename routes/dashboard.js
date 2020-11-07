const express = require('express');
const router = express.Router();

const authorize = require("../middleware/authorize");
const pool = require("../models/db");
/* GET Dashboard PAGE */

const { dashboardController } = require('../controller/dashboardController')
 
router.get("/", authorize, dashboardController)

module.exports = router;


