var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

//restart

const { decodeToken } = require('./app/auth/middleware');

const authRouter = require('./app/auth/router');
const UserRouter = require('./app/routers/UserRouter');
const MembershipRouter = require('./app/routers/MembershipRouter');
const RentManagementRouter = require('./app/routers/RentManagementRouter');
const BookManagementRouter = require('./app/routers/BookManagementRouter');

const { checkUser } = require('./app/middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(decodeToken());

//router here
app.use('/api', authRouter);
app.use('/api', checkUser, UserRouter);
app.use('/api', checkUser, MembershipRouter);
app.use('/api', checkUser, RentManagementRouter);
app.use('/api', checkUser, BookManagementRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
