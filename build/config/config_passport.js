var Passport = require('passport'),
    Google_Strategy = require('passport-google-oauth').OAuth2Strategy,
    Local_Strategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function (app, config) {
    
    var googleFunction = function (accessToken, refreshToken, profile, done) {
        console.log('Google gave the id of: ', profile.id);

        //See if the user exists (Profile ID)
        User.findOne({ 'auth.google': profile.id }).exec(function (findErr, theUser) {
            if (findErr) {
                return done(null, false, findErr);
            } else {
                if (theUser) {
                    //User exists already
                    console.log("Welcome back: ", theUser.username);
                    return done(null, theUser);
                } else {
                    //Does this person have a email already?
                    User.findOne({ 'contactEmail': profile.emails[0].value }).exec(function (findErr, priorUser) {
                        if(findErr) {
                            return done(null, false, findErr);
                        } else if(priorUser) {
                            //They have a user with this email already
                            priorUser.auth.google = profile.id;
                            priorUser.save(function(saveErr) {
                                if(saveErr) {
                                    return done(null, false, saveErr);
                                } else {
                                    return done(null, priorUser);
                                }
                            });
                        } else {
                            //User does not exist, create one first
                            var newUser = {
                                username: profile.displayName,
                                contactEmail: profile.emails[0].value,
                                auth: {
                                    google: profile.id
                                }
                            };
                            User.create(newUser, function (createErr, newUser) {
                                if (createErr) {
                                    return done(null, false, createErr);
                                } else {
                                    console.log("Welcome to our new user: ", newUser.username);
                                    return done(null, newUser);
                                }
                            });
                        }
                    });
                    
                }
            }
        });
    };
    //Google Authentication
    Passport.use(new Google_Strategy({
        clientID: config.google_Oauth.Client_Id,
        clientSecret: config.google_Oauth.Client_Secret,
        callbackURL: config.google_Oauth.callback,
        scope: 'email'
    }, googleFunction));
    
    Passport.use('googleMobile', new Google_Strategy({
        clientID: config.google_Oauth.Client_Id,
        clientSecret: config.google_Oauth.Client_Secret,
        callbackURL: config.google_Oauth.mobileCallback,
        scope: 'email'
    }, googleFunction));
    
    //Local Authentication
    Passport.use(new Local_Strategy(function (email, password, done) {
        User.findOne({ 'contactEmail': email }).exec(function (findErr, theUser) {
            if (findErr) {
                return done(null, false, findErr);
            } else {
                if (theUser) {
                    //Found their email. Check Password Match
                    if (theUser.comparePassword(password)) {
                        console.log('Welcome Back, ', theUser.username);
                        return done(null, theUser);
                    } else {
                        console.log('Invalid login attempt: ', theUser.username);
                        return done(null, false, { message: 'Invalid password.' });
                    }
                } else {
                    console.log('Invalid login attempt: Bad Email: ', email);
                    return done(null, false, { data: 'Invalid Email' });
                }
            }
        });
    }));
    
    //Serialization
    Passport.serializeUser(function (user, done) {
        if(user.auth) {
            delete user.auth;
        }
        done(null, user);
    });
    Passport.deserializeUser(function (obj, done) {
        if(obj.auth) {
            delete obj.auth;
        }
        done(null, obj);
    });
};