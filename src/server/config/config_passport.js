var Passport = require('passport'),
    Google_Strategy = require('passport-google-oauth').Strategy;

module.exports = function(app, config) {
    Passport.use(new Google_Strategy({
        clientID: 'hi',
        clientSecret: 'cool',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    }, function(accessToken, refreshToken, profile, done){
        //The identifier is specific to the user from google
        console.log('Google Returned: ',profile);
        //The profile will have specific profile information
        return done(null, {message: 'HI'});
    }));
    
    
};