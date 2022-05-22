const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const logger = require('morgan');

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const  store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'mySessions'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(cors({
  origin : ['http://localhost:3000'],
  credentials: true
}));
app.use(session({
  secret: 'keyboard_ronewa',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24 * 7, 
    //secure: true 
  },
  store: store,
}))
app.use(mongoSanitize())
app.use(xss());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', indexRouter);
app.use('/api/v1/users', usersRouter);

//app.use(notFound);
app.use(errorHandlerMiddleware);

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
