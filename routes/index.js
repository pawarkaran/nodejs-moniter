const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();



const pool = require("../models/db");
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Laundry' });
//   console.log(req.body);
// });


// router.post("/registerr", (req, res, next) => {
//   res.send('index Register post');
//   console.log(req.body);
// });



/* POST NEW User Register */


module.exports = router;


/*
GET index       /post 
GET new         /post/new 
POST create     /post/:id 
GET show        /post/:id/edit 
GET edit        /post/:id
PUT update      /post/:id
DELETE destroy  /post/:id
*/



// --------------- Query to Get all data -----------

// const allusers = pool.query("SELECT user_firstname FROM users", (err,res) => {
//     for (let username of res.rows) {
//         console.log(username);
//     } 
   
    
// })


// const query = `SELECT * FROM users`;
// const firstname = `SELECT user_firstname FROM users`;
// pool.query(firstname, (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     for (let row of res.rows) {
//         console.log(row);
//     }

// });

  
    // console.log('tart');
   
    // // const yell = console.log('user denied');
    // const usersel = `SELECT * FROM users WHERE user_firstname = 'BOB'`;
    // const user = pool.query(`SELECT user_firstname FROM users where user_firstname = 'BOB';`, (req,res) => {
    //     x = 5
    //     for (let row of res.rows) {
    //         console.log(row);
    //     }
    //     let row = res.rows
    //     // let row = res.rows
    //     // console.log(row)
    //     if (user != row ) {
    //         console.log('not authorized');
    //          return "eacc deniad"
             
    //      } else {
    //          console.log('authorized');
    //      }
         
    //     for (let row of res.rows) {
    //                 console.log(row);
    //             }
    //     // let row = res.rows
    //     //  console.log(row)
    // })
    
    // console.log(role);
    // const use = res;

    //  if  (!role.rows === 'Builder' ) {
    //     console.log(yell);
    //     return yell

    // } else {
    //     return "user error"
    // }
    // console.log(role);
