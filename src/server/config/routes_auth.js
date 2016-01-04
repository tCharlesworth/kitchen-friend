var Passport = require('passport');

module.exports = function(app) {
    // Redirect the user to Google for authentication.  When complete, Google
    // will redirect the user back to the application at
    //     /auth/google/return
    app.get('/auth/google', Passport.authenticate('google'));

    // Google will redirect the user to this URL after authentication.  Finish
    // the process by verifying the assertion.  If valid, the user will be
    // logged in.  Otherwise, authentication has failed.
    app.get('/auth/google/callback',
    Passport.authenticate('google', { successRedirect: '/',
                                      failureRedirect: '/login' }));
}