var mongoose = require('mongoose');

module.exports = function(config) {
    /***********Mongoose Connection***********/
    mongoose.connect(config.mongo_uri);
    var db = mongoose.connection;
    db.on('error', function(err) {
        console.error('Could not connect to database: ', config.mongo_uri);
        console.error(err);
    });
    db.once('open', function(){
        console.log('Database connected successfully.');
    })
    
}