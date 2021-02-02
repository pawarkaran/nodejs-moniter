const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config()
const nodemailer = require('nodemailer');

transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  pool: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});


const indexRouter = require('./routes/index');
const register = require('./routes/register');

const login = require('./routes/login');
const dashboard = require('./routes/dashboard');
const profile = require('./routes/profile');
const verification = require('./routes/verifymail');
const password = require('./routes/password');
const adminAuth = require('./routes/adminAuth')
const issues = require('./routes/issues')
const demo = require('./routes/demo')


const app = express();

app.use(bodyParser.json())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/', indexRouter);
app.use('/authentication', register);
app.use('/authentication', login);
app.use('/dashboard', dashboard);
app.use('/profile', profile);
app.use('/verification', verification);
app.use('/password', password);
app.use('/admin', adminAuth);
app.use('/issues', issues);
app.use('/demo', demo);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
