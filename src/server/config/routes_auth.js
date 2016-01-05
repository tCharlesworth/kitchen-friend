var Passport = require('passport'),
    UserCtrl = require('../controllers/userCtrl');

module.exports = function(app) {
    
    // Redirect the user to Google for authentication.  When complete, Google
    // will redirect the user back to the application at
    //     /auth/google/return
    app.get('/auth/google', Passport.authenticate('google', {scope: 'openid email profile'}));

    // Google will redirect the user to this URL after authentication.  Finish
    // the process by verifying the assertion.  If valid, the user will be
    // logged in.  Otherwise, authentication has failed.
    app.get('/auth/google/callback',
    Passport.authenticate('google', { failureRedirect: '/#/login' }), function(req, res) {
        //Authentication Successful!
        console.log("Google Auth Successful");
        res.redirect('/#/home');
    });
    
    
    
    app.post('/auth/signup', UserCtrl.createLocalUser);
    
    app.post('/auth/local', Passport.authenticate('local'), function(req, res) {
        console.log('Login successful');
        res.json('success');
    });
    
    app.get('/auth/logout', UserCtrl.logout);
}