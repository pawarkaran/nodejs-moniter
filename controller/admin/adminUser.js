const express = require('express');
const pool = require('../../models/db');
const router = express.Router()
const jwt = require('jsonwebtoken');
const jwtGenerator = require("../../utils/jwtGenerator");
const bcrypt = require("bcrypt");

exports.adminUsers = async (req, res, next) => {
    try {
        const allUser = await pool.query(
            // "SELECT user_firstname, user_email FROM users"
            "select usr.user_firstname,usr.user_email,usr.user_id,count(issue.issue_id) as issueCount from users usr left join issues issue on usr.user_id = issue.user_id group by usr.user_firstname,usr.user_email,usr.user_id"
        );

        // const userIssues = await pool.query(
        //     "SELECT COUNT( i.issue_id) FROM users AS u LEFT JOIN issues AS i ON u.user_id = i.user_id WHERE u.user_email = 'kpadmin@yopmail.com'"
        // );
//  "SELECT u.user_firstname, i.issue_id, i.title, i.services, i.assign_to, i.statusof, i.priorities, i.created_at, i.breach, i.actions FROM users AS u LEFT JOIN issues AS i ON u.user_id = i.user_id WHERE u.user_id = $1",

        return res.json(allUser.rows)
        //  res.json("Check Setting")
    } catch (err) {
        console.error(err.message);
    }
}

exports.userIssues = async (req, res, next) => {
        // user = req.body;
        
        const issueId = req.params.id;
       
        console.log('start');
    try{
        const allIssues = await pool.query(
            "SELECT i.issue_id, i.title, i.services, i.assign_to, i.statusof, i.priorities, i.created_at, i.breach, i.actions FROM users AS u LEFT JOIN issues AS i ON u.user_id = i.user_id WHERE u.user_id = $1",
            [issueId]
        );
        // console.log(allIssues);
        // console.log(issueId);

        return res.json(allIssues.rows)

        // res.json("Check")
        
    } catch {

    }
}