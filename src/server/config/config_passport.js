var Passport = require('passport'),
    Google_Strategy = require('passport-google').Strategy;

module.exports = function(app, config) {
    Passport.use(new Google_Strategy({
        returnURL: '',
        realm: ''
    }, function(identifier, profile, done){
        //The identifier is specific to the user from google
        //The profile will have specific profile information
    }));
    
    
};