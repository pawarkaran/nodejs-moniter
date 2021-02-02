const express = require('express');
const router = express.Router();

const authorize = require("../middleware/authorize");
const pool = require("../models/db");

const { getIssuesController, postIssuesController, putIssuesController, deleteIssuesController, getIssueByIdController, patchStatusController,  } = require('../controller/issuesController')


router.get('/', authorize, getIssuesController)

router.get('/:id', authorize, getIssueByIdController)

router.post('/', authorize, postIssuesController)

router.put('/:id', authorize, putIssuesController)

router.patch('/kappa', authorize, patchStatusController)

router.delete('/:id', authorize, deleteIssuesController)

module.exports = router;