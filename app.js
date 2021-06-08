var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./server/routes/index');
var imagesRouter = require('./server/routes/images');

var app = express();
var process = require('process');
const {downloadImages} = require('./server/utils/dowload-helper');

// view engine setup
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join( __dirname,'./dist/client')));
// app.use('/images', express.static('images')); 

// Home page
app.use('/', indexRouter);

// Provide api for images
app.use('/api/', imagesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// READ file & DOWNLOAD ALL IMAGES 
const filePath = path.join(__dirname, 'dates.txt');
try{
  downloadImages(filePath);
}
catch(e){
  console.log('nhi', err);
  req.end();
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('NHI Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
  process.exit(2);
});

module.exports = app;
