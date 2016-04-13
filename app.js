var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//ALG 3/31/2016 adding the database configs, these are not checked in. You need to create your own! 

var LynxDBconfig = require('./env/LynxDB.config.json')
var AXDBconfig = require('./env/AXDB.config.json')

var routes = require('./routes/index');
var data = require('./routes/data');
var outbound = require('./routes/outbound');
var outboundAjax = require('./routes/outboundAjax');
var api = require('./routes/api');

//<alg>
var sql = require('mssql');
var handlebars = require('express-handlebars').create({
	defaultLayout: 'main',
	helpers:{
		foo: function(){return 'FOO!';}, 
		section: function(name, options){
			if(!this._sections)
				this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}

});
//</alg>
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ALG 3/31/2016 make the SQL object accessible to our routers
app.use(function(req,res,next){
	req.sql = sql;
	next();
});
app.use(function(req,res,next){
	req.LynxDBconfig = LynxDBconfig;
	req.AXDBconfig = AXDBconfig;
	next();
});


app.use('/', routes);
app.use('/data', data);
app.use('/outbound', outbound);
app.use('/outboundAjax', outboundAjax);
app.use('/api', api);

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
