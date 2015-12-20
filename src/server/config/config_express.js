var express     = require('express'),
    session     = require('express-session'),
    bodyParser  = require('body-parser'),
    passport    = require('passport');

module.exports = function(app, config) {
    /*************Middleware***************/
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(session({secret: config.session_secret, resave: true, saveUninitialized: true}));
    app.use(passport.session());
    app.use(passport.initialize());
    app.use(express.static(config.rootPath + '/www'));
}