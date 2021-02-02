const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const nodemailer = require('nodemailer');
const pool = require("../models/db");
require("dotenv").config()
const cron = require("node-cron");
var fs = require("fs");
const { body } = require('express-validator');
const { exit } = require('process');
var handlebars = require('handlebars');

aa = 'sdasd'

str = `INSERT INTO issues (user_id, time_now ,title, services, assign_to, statusof, priorities, breach, actions) select user_id , TO_CHAR(CURRENT_TIMESTAMP, 'DD/MM/YYYY HH12:MI:SS AM'),${aa},'curl','curl','curl','curl','curl','' from users`


var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
      if (err) {
          throw err;
          callback(err);
      }
      else {
          callback(null, html);
      }
  });
};

// -------------------------------------------------------------------

// (async function uu(){
// const rover = await pool.query(
//   `select * from issues where title = 'yourhost' order by issue_id desc`
// )
// // rover.rows.forEach(element => {
// //   console.log(element.actions);
// // });
// const actionall = rover.rows[0].actions
// console.log("sasss--------" + actionall);

// })()


router.post('/5', function (req, res, next) {
  // console.log("nowww  " + req.body.title);
  pp = async () => {
 const power = await pool.query(
    `select * from issues where title = '${req.body.title}' order by issue_id desc`
  )
  
  if (power.rows.length === 0 ) {   
    
    const addCritical = await pool.query(
      `INSERT INTO issues (user_id, time_now ,title, services, assign_to, statusof, priorities, breach, actions) select user_id , TO_CHAR(CURRENT_TIMESTAMP, 'DD/MM/YYYY HH12:MI:SS AM'),'${req.body.title}','${req.body.services}','${req.body.assign_to}','${req.body.statusof}','${req.body.priorities}','${req.body.breach}','${req.body.actions}' from users where users.user_role = 'developer'`

    );
 


    (async function sendmail() {
      const maile = await pool.query(
        `select issues.issue_id,  users.user_email ,issues.title , issues.services ,issues.assign_to ,issues.priorities ,issues.statusof from issues
          inner join users on users.user_id = issues.user_id where issues.is_mail_send = 'false' and users.user_role ='developer';`
      );
      const arrays = maile.rows.forEach((element, async) => {

        //  console.log(element.user_email);
        const allEmails = element.user_email
        // console.log(allEmails);
        const mailString = allEmails.toString()
        console.log(mailString);

        readHTMLFile('/home/karan/SERVER/node Js/prac/devops/views/issue.html', function (err, html) {
          var template = handlebars.compile(html);
          var replacements = {
              username: "KARAN PAWAR TEST",  // parameters 
              title: `${req.body.title}`,
              services: `${req.body.services}`,
             
        
          };
          var htmlToSend = template(replacements);
        // console.log(req.body.title);
        // allEmails.forEach(function (to, i, array) {
          const mailOptions = {
            from: process.env.EMAIL, // sender this is your email here
            subject: "New Issue Created",
            html: htmlToSend
        };
        // const mailOptions = {
        //   from: process.env.EMAIL, // sender this is your email here
        //   // receiver email2
        //   subject: "New Issue Created",
        //   html: `<h1> Test For All Mail<h1><br><hr>
        //         <br><p> Warning issue is created please check TITLE: ${req.body.title} Services: ${req.body.services}</p>`
        // }
        mailOptions.to = mailString;
        console.log('ending');


        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            if (info.response.indexOf('OK') > 0) {
              console.log(`update issues set is_mail_send =true where issue_id =${element.issue_id}`);
              await pool.query(`update  issues set is_mail_send =true where issue_id =${element.issue_id}`);
            }

          }
          console.log('ending2');
        })
        })
      });


    })();

    console.log("post cuz it was never present");
    // return res.status(401).json("Invalid Credential or Register First");
} else{
  console.log("statment for issue not presnt completed");
}


  const actionall = power.rows[0].actions
  console.log("sasss--------" + actionall);
  // console.log(actionall);
  
  if (actionall == 'resolved') {

    
   
    const addCritical = await pool.query(
      `INSERT INTO issues (user_id, time_now ,title, services, assign_to, statusof, priorities, breach, actions) select user_id , TO_CHAR(CURRENT_TIMESTAMP, 'DD/MM/YYYY HH12:MI:SS AM'),'${req.body.title}','${req.body.services}','${req.body.assign_to}','${req.body.statusof}','${req.body.priorities}','${req.body.breach}','${req.body.actions}' from users where users.user_role = 'developer'`

    );
 


    (async function sendmail() {
      const maile = await pool.query(
        `select issues.issue_id,  users.user_email ,issues.title , issues.services ,issues.assign_to ,issues.priorities ,issues.statusof from issues
          inner join users on users.user_id = issues.user_id where issues.is_mail_send = 'false' and users.user_role ='developer';`
      );
      const arrays = maile.rows.forEach((element, async) => {

        //  console.log(element.user_email);
        const allEmails = element.user_email
        // console.log(allEmails);
        const mailString = allEmails.toString()
        console.log(mailString);

        readHTMLFile('/home/karan/SERVER/node Js/prac/devops/views/issue.html', function (err, html) {
          var template = handlebars.compile(html);
          var replacements = {
              username: "KARAN PAWAR TEST",  // parameters 
              title: `${req.body.title}`,
              services: `${req.body.services}`,
             
        
          };
          var htmlToSend = template(replacements);
        // console.log(req.body.title);
        // allEmails.forEach(function (to, i, array) {
          const mailOptions = {
            from: process.env.EMAIL, // sender this is your email here
            subject: "New Issue Created",
            html: htmlToSend
        };
        // const mailOptions = {
        //   from: process.env.EMAIL, // sender this is your email here
        //   // receiver email2
        //   subject: "New Issue Created",
        //   html: `<h1> Test For All Mail<h1><br><hr>
        //         <br><p> Warning issue is created please check TITLE: ${req.body.title} Services: ${req.body.services}</p>`
        // }
        mailOptions.to = mailString;
        console.log('ending');


        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            if (info.response.indexOf('OK') > 0) {
              console.log(`update issues set is_mail_send =true where issue_id =${element.issue_id}`);
              await pool.query(`update  issues set is_mail_send =true where issue_id =${element.issue_id}`);
            }

          }
          console.log('ending2');
        })
        })
      });


    })();




    console.log("post it now");
 
 
 
 
  } else if (actionall == "triggered"){
    console.log("tttttttttttttttttttttttt");
  }

  else {
    console.log("Last issue of same host_name nt solved ");
  }

  console.log("issue present do work");
}
  // power.rows.forEach(element => {
  //     console.log(element.title);
  // });

  

pp();
return res.json("200")
  // console.log("nwo " + power.rows[0].title);
})



// --------------------------------------------------------------------




// router.post('/', function (req, res, next) {
//   kp = async () => {

//     const addCritical = await pool.query(
//       "INSERT INTO issues (user_id, time_now ,title, services, assign_to, statusof, priorities, breach, actions) select user_id , TO_CHAR(CURRENT_TIMESTAMP, 'DD/MM/YYYY HH12:MI:SS AM'),'curl','curl','curl','curl','curl','curl','' from users"

//     );


//     (async function sendmail() {
//       const maile = await pool.query(
//         `select issues.issue_id,  users.user_email ,issues.title , issues.services ,issues.assign_to ,issues.priorities ,issues.statusof from issues
//             inner join users on users.user_id = issues.user_id where issues.is_mail_send = 'false' and users.user_role ='developer';`
//       );
//       const arrays = maile.rows.forEach((element, async) => {

//         //  console.log(element.user_email);
//         const allEmails = element.user_email
//         // console.log(allEmails);
//         const mailString = allEmails.toString()
//         console.log(mailString);

//         // allEmails.forEach(function (to, i, array) {

//         const mailOptions = {
//           from: process.env.EMAIL, // sender this is your email here
//           // receiver email2
//           subject: " Issue Created",
//           html: `<h1> Test For All Mail<h1><br><hr>
//                   <br><p> Warning issue is created please check TITLE: Services:</p>`
//         }
//         mailOptions.to = mailString;
//         console.log('ending');
//         transporter.sendMail(mailOptions, async function (error, info) {
//           if (error) {
//             console.log(error);
//           } else {
//             console.log('Email sent: ' + info.response);
//             if (info.response.indexOf('OK') > 0) {
//               console.log(`update issues set is_mail_send =true where issue_id =${element.issue_id}`);
//               await pool.query(`update  issues set is_mail_send =true where issue_id =${element.issue_id}`);
//             }

//           }
//           console.log('ending2');

//         })
//       });


//     })();

//     res.json("posted")


//   }

//   try {




//   } catch {
//     console.log("mailing error");
//   }
//   kp()
//   // console.log(req.body);
// });



// -------------------------------------------------------------------


module.exports = router;