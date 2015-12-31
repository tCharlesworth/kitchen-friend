var mongoose = require('mongoose'),
    Recipe = require('../models/Recipe'),
    User = require('../models/User');

module.exports = function(config) {
    /***********Mongoose Connection***********/
    mongoose.connect(config.mongo_Uri);
    var db = mongoose.connection;
    db.on('error', function(err) {
        console.error('Could not connect to database: ', config.mongo_Uri);
        console.error(err);
    });
    db.once('open', function(){
        console.log('Database connected successfully.');
    })
    
};