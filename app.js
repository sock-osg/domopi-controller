var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/domopi", {native_parser: true});

var routes_index = require('./application/routes/routes_index');
var routes_users = require('./application/routes/routes_users');
var routes_controls = require('./application/routes/routes_controls');

var app = express();

// Express Configuration
app.set('views', path.join(__dirname, 'application/views'));
app.set('view engine', 'jade');

//app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.set('x-powered-by', false);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use(function(req, res, next) {
    req.db = db;
    next();
});

// Configure routes
app.use('/', routes_index);
app.use('/users', routes_users);
app.use('/controls', routes_controls);

// catch 404 and forwarding to error handler
app.use(function(err, req, res, next) {
    //var err = new Error('Not found');
    console.log(err);
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('common/error', {
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
