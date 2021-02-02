const express = require('express');
const router = express.Router();

const authorize = require("../middleware/authorize");
const pool = require("../models/db");
const nodemailer = require('nodemailer');



exports.getIssuesController = async (req, res, next) => {
  try {

    const user = await pool.query(
      "SELECT u.user_firstname, i.time_now, i.issue_id, i.title, i.services, i.assign_to, i.statusof, i.priorities, i.created_at, i.breach, i.actions FROM users AS u LEFT JOIN issues AS i ON u.user_id = i.user_id WHERE u.user_id = $1 order by issue_id desc",
      [req.user.id]
    );

    return res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

}

exports.getIssueByIdController = async (req, res, next) => {
  const issueId = req.params.id;
  // const { id } = req.params;
  // console.log(issueId);
  try {
    const user = await pool.query(
      "SELECT i.issue_id, i.title, i.services, i.assign_to, i.statusof, i.priorities, i.created_at, i.breach, i.actions FROM users AS u LEFT JOIN issues AS i ON u.user_id = i.user_id WHERE issue_id = $1 AND u.user_id = $2 order by issue_id desc",
      [issueId, req.user.id]
    );


    if (user.rows.length === 0) {
      return res.json("This is not your issue");
    }

    return res.json(user.rows);
    // console.log(issueId);
    // console.log(req.user.id);

    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}
// id, req.user.id
exports.postIssuesController = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { title, services, assign_to, statusof, priorities, breach, actions } = req.body;

    const newIssues = await pool.query(
      "INSERT INTO issues (user_id, title, services, assign_to, statusof, priorities, breach, actions, time_now) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, TO_CHAR(CURRENT_TIMESTAMP, 'DD/MM/YYYY HH12:MI:SS AM')) RETURNING *",
      [req.user.id, title, services, assign_to, statusof, priorities, breach, actions]
    );
    const newEmail = await pool.query("SELECT user_email FROM users WHERE user_id = $1",
    [req.user.id]
    );
    console.log(newEmail.rows[0].user_email);
    const mailer = (newEmail.rows[0].user_email);
// console.log(req.body);
// const newEmail2 = await pool.query("SELECT user_email FROM users LEFT JOIN issues WHERE user_id = $1",
//     [req.user.id]
//     );
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
      }
  });


  const mailOptions = {
    from: process.env.EMAIL, // sender this is your email here
    to: `${mailer}`, // receiver email2
    subject: "New Issue Created",
    html: `<h1> ${req.body.title}<h1><br><hr>
<br><p> Warning issue is created please check TITLE:${req.body.title} Services:${req.body.services}</p>`
}
console.log('end');
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
console.log('en2');

    // console.log(newEmail);
    // console.log("");
    return res.json(newIssues.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(201).send("Check if all values are correct")
  }
}

exports.putIssuesController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, services, assign_to, statusof, priorities, breach, actions } = req.body;
    const updateIssues = await pool.query(
      "UPDATE issues SET (title, services, assign_to, statusof, priorities, breach, actions)=($1, $2, $3, $4, $5, $6, $7) WHERE issue_id = $8 AND user_id = $9 RETURNING *",
      [title, services, assign_to, statusof, priorities, breach, actions, id, req.user.id]
    );

    if (updateIssues.rows.length === 0) {
      return res.json("This is not your issue");
    }

    return res.json("Issue was updated");
  } catch (err) {
    console.error(err.message);
  }
}

exports.patchStatusController = async (req, res, next) => {
  try {
    // const { id } = req.params;
    const { statusof, id } = req.body;
    const updateStatus = await pool.query(
      "UPDATE issues SET statusof=$1,actions='resolved' WHERE issue_id = $2 AND user_id = $3 RETURNING *",
      [statusof, id, req.user.id]
    );
console.log(statusof + ' '+ id + ' ' + req.user.id);
    // update issues set statusof ='resolved',actions='resolved' where title = 'curl'

    if (updateStatus.rows.length === 0) {
      return res.json("This is not your status");
    }

    return res.json("Status was updated");
  } catch (err) {
    console.error(err.message);
  }
}

exports.deleteIssuesController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteIssues = await pool.query(
      "DELETE FROM issues WHERE issue_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteIssues.rows.length === 0) {
      return res.json("This issue is not yours");
    }

    return res.json("Issue was deleted");
  } catch (err) {
    console.error(err.message);
  }
}