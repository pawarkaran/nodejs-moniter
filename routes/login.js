const express = require('express');
const router = express.Router();
const validInfo = require("../middleware/validInfo");


const pool = require("../models/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

const { loginController } = require ('../controller/loginController')
const { loginValidator } = require ('../middleware/validators')


/* get Login*/
router.get('/login', async (req, res, next) => {
  res.send('GET /login');
  console.log(req.body);
});


router.post('/login', loginValidator, loginController)




router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



module.exports = router;