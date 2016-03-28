var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var data = require('./routes/data');
//<alg>
var sql = require('mssql');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
//</alg>
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/data', data);


/*//ALG AUTO ROUTING 
var autoViews={};
var fs = require('fs');

app.use(function(req, res, next){
	var path = req.path.toLowerCase();
	//check cache
	if(autViews[path]) return res.render(autViews[path]);
	//if not
	if(fs.existsSync(__dirname + '/views' + path + '.handlebars')){
		autViews[path] = path.replace(/^\//, '');
		return res.render(autoViews[path]);
	}
	next();
});
//</alg> autorouting 
*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;