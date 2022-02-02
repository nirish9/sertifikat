const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session')
const app = express();

app.use(require('connect-flash')())
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.use(session({
  secret: 'secretApiKey',
  resave: true,
  saveUninitialized: true,
}))


require('./middleware/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

app.get('*' , (req , res , next) => {
  res.locals.user = req.user || null
  next()
})

const RIndex = require('./routes/index');
const RAdd = require('./routes/add');
const RProducts = require('./routes/products');
const RRegister = require('./routes/register');
const RLogin = require('./routes/login');
const RLogout = require('./routes/logout');

require('./helper/db')()
/* MONGOSE */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/products', express.static(path.join(__dirname, 'public')));

app.use('/', RIndex);
app.use('/add', RAdd);
app.use('/products', RProducts);
app.use('/register', RRegister);
app.use('/login', RLogin);
app.use('/logout', RLogout);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
