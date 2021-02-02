const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const nodemailer = require('nodemailer');
const pool = require("../models/db");
require("dotenv").config()
const cron = require("node-cron");
var fs = require("fs")


// const moment = require('moment');
var moment = require('moment-timezone');

var utc = 1605870824;
var m = moment.unix(utc).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
console.log(m);

console.log(moment().tz('Asia/Kolkata').format('DD/MM/YYYY h:mm:ss a'));

// ------------------------ Calculate Difference---------------
// var duration = moment.duration(end.diff(startTime));
// var hours = duration.asHours();
// --------------------------------

// // --------------- For Time AND STATUS Update ----------------
// setInterval(() => {
//   dates = new Date(Date.now()).toString()
// }, 1000);


// var starting = function (data) {
//   setTimeout(function () {
//     // cron.schedule("*/5 * * * * *", function () {
//     fs.writeFileSync("status.txt", `${dates} OK`);
//     console.log("running loop");
//   }, 10000);
//   // });
// };

// var ending = function (callback) {
//   fs.writeFileSync("status.txt", `${dates} CRITICAL`);
//   callback();
// };


// cron.schedule("*/20 * * * * *", function () {
//   ending(starting);
// });

// const recover = cron.schedule("*/60 * * * * *", async function (req, res) {

// const finding = cron.schedule("*/1 * * * * *", async function (req, res) {

//   let file = fs.readFileSync("status.txt", "utf8");
//   let arr = file.split(/\r?\n/);
//   arr.forEach((line, idx) => {
//     if (line.includes("CRITICAL")) {
//       // finding(console.log("CRITICAL IT WILL STOP COUNTS")).stop
//       try {

//         kp = async () => {

//           const addCritical = await pool.query(
//             "INSERT INTO issues (user_id, time_now ,title, services, assign_to, statusof, priorities, breach, actions) select user_id , TO_CHAR(CURRENT_TIMESTAMP, 'DD/MM/YYYY HH12:MI:SS AM'),'critical','critical','critical','critical','critical','critical','' from users"
//           );


//           (async function sendmail() {
//             const maile = await pool.query(
//               `select issues.issue_id,  users.user_email ,issues.title , issues.services ,issues.assign_to ,issues.priorities ,issues.statusof from issues
//               inner join users on users.user_id = issues.user_id where issues.is_mail_send = 'false' and users.user_role ='developer';`
//             );
//             const arrays = maile.rows.forEach((element, async) => {

//               //  console.log(element.user_email);
//               const allEmails = element.user_email
//               // console.log(allEmails);
//               const mailString = allEmails.toString()
//               console.log(mailString);

//               // allEmails.forEach(function (to, i, array) {

//               const mailOptions = {
//                 from: process.env.EMAIL, // sender this is your email here
//                 // receiver email2
//                 subject: " Issue Created",
//                 html: `<h1> Test For All Mail<h1><br><hr>
//                     <br><p> Warning issue is created please check TITLE: Services:</p>`
//               }
//               mailOptions.to = mailString;
//               console.log('ending');
//               transporter.sendMail(mailOptions,async function (error, info) {
//                 if (error) {
//                   console.log(error);
//                 } else {
//                    console.log('Email sent: ' + info.response);
//             if (info.response.indexOf('OK') > 0) {
//                  console.log(`update issues set is_mail_send =true where issue_id =${element.issue_id}`);
//                   await pool.query(`update  issues set is_mail_send =true where issue_id =${element.issue_id}`);
//                   }

//                 }
//                 console.log('ending2');

//               })
//             });


//           })();



//         }

//         try {




//         } catch {
//           console.log("mailing error");
//         }
//         kp()
//         //  console.log(maile.rows.user_email);
//         // });
//         finding.stop(console.log("CRITICAL IT WILL STOP COUNTS"))
//         console.log("CRIRICAL STATE");
//       } catch (err) {
//         console.log(err);
//       }


    



//       // console.log((idx + 1) + ':' + line);
//     } else {
//       console.log("Everthing is Okay");
//     }
//   });

// });
// // });

// -------------------------------------------------------



// ----------------- Mail Loop -------------------------------
// const mailLoop = async () => {
//     const maile = await pool.query(
//       "SELECT user_email from users"
//     );
//   const arrays = maile.rows.forEach((element, async) => {
//     //  console.log(element.user_email);
//     const allEmails = element.user_email
//     // console.log(allEmails);
//     const mailString = allEmails.toString()
//     console.log(mailString);

//     // allEmails.forEach(function (to, i, array) {

//     const mailOptions = {
//       from: process.env.EMAIL, // sender this is your email here
//       // receiver email2
//       subject: "New Issue Created",
//       html: `<h1> Test For All Mail<h1><br><hr>
// <br><p> Warning issue is created please check TITLE: Services:</p>`
//     }
//     mailOptions.to = mailString;
//     console.log('ending');
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);

//       }
//       console.log('ending2');

//     })
//   });


// }
// mailLoop();
// });
// --------------------------------------



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Laundry' });
  console.log(req.body);
});

const karan = async (req, res) => {


  console.log("mel");
  try {
    const [title, services, assign_to, statusof, priorities, breach, actions] = ["critical", "critical", "critical", "critical", "critical", "critical", "critical"]
    console.log(services);
    const addCritical = await pool.query(
      "INSERT INTO issues (user_id ,title, services, assign_to, statusof, priorities, breach, actions) select user_id , 'critical','critical','critical','critical','critical','critical','' from users"
    );
    const maile = await pool.query(
      "select user_email from users"
    )
    //  console.log(maile.rows.user_email);
    // });

  } catch (err) {
    console.log(err);
  }

}
// karan()




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
