var mongoose = require('mongoose'),
    Recipe = require('../models/Recipe'),
    PublicRecipe = require('../models/PublicRecipe'),
    User = require('../models/User'),
    Group = require('../models/Group'),
    GroupRecipe = require('../models/GroupRecipe'),
    mongoData = {};
    
mongoData.connectionAttempts = 0;

var attemptDbConnection = function() {
    console.log('Connecting to the database');
    mongoData.connectionAttempts++;
    mongoose.connect(mongoData.mongo_Uri);
    mongoData.db = mongoose.connection;
    if(mongoData.connectionAttempts === 1) {
        setupListeners();
    }
}

var setupListeners = function() {
    mongoData.db.on('error', function(err) {
        console.error('Could not connect to database: ', mongoData.mongo_Uri);
        console.error('    >>'+err.message);
        //Wait and try again
        if(mongoData.connectionAttempts < 4) {
            setTimeout(attemptDbConnection, 4000);
        } else {
            console.log('Failed to connect to database. Please fix problems and restart the server.')
        }
    });

    mongoData.db.once('open', function(){
        console.log('Database connected successfully in '+mongoData.connectionAttempts+' attempts');
    });
}

module.exports = function(config) {
    /***********Mongoose Connection***********/
    mongoData.mongo_Uri = config.mongo_Uri;
    attemptDbConnection();
    
    
};