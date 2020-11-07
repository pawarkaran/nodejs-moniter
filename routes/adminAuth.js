const express = require('express');
const router = express.Router();
require("dotenv").config()
const { adminRegisterController, adminVerifyController, adminLoginController } = require('../controller/adminController')
const { registerValidator } =require('../middleware/validators')
const { adminUsers, userIssues } = require('../controller/admin/adminUser');

const authorize = require("../middleware/authorize");


router.post("/adminregister", registerValidator, adminRegisterController)
router.get("/adminregister", async (req,res) =>{
    res.send("hello register")
})

router.post('/adminverify', adminVerifyController)

router.post('/adminlogin', adminLoginController)

router.get('/users',authorize, adminUsers)

router.get('/issues/:id',authorize, adminUsers)



router.get('/users/issues/:id',authorize, userIssues)


module.exports = router;