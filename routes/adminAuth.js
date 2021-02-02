const express = require('express');
const router = express.Router();
require("dotenv").config()
const { adminRegisterController, adminVerifyController, adminLoginController, adminDashboardController } = require('../controller/adminController')
const { registerValidator } =require('../middleware/validators')
const admin_authorize = require("../middleware/admin_authorize");


const { adminUsers, userIssues, userDetails } = require('../controller/admin/adminUser');

router.post("/adminregister", registerValidator, adminRegisterController)
router.get("/adminregister", async (req,res) =>{
    res.send("hello register")
})

router.get('/dashboard',admin_authorize, adminDashboardController)

router.post('/adminverify', adminVerifyController)

router.post('/adminlogin', adminLoginController)

router.get('/users',admin_authorize, adminUsers)

router.get('/issues/:id', admin_authorize, adminUsers)



router.get('/users/issues/:id', admin_authorize, userIssues)

router.patch('/users/details/:id', admin_authorize, userDetails)


module.exports = router;