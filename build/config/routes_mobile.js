var MobileCtrl = require('../controllers/mobileCtrl'),
    cors = require('cors'),
    passport = require('passport'),
    UserCtrl = require('../controllers/userCtrl');
    
module.exports = function(app) {
    
    app.options('/mobile/login', cors(), tester);
    app.post('/mobile/login', cors(), tester, MobileCtrl.checkLoginLocal);
    
    app.options('/mobile/recipes/:userId', cors());
    app.post('/mobile/recipes/:userId', cors(), MobileCtrl.addUserRecipe);
    app.delete('/mobile/recipes/:userId', cors(), MobileCtrl.removeUserRecipe);
    app.get('/mobile/recipes/:userId', cors(), MobileCtrl.getUsersRecipes);
    
    app.options('/mobile/auth/register', cors());
    app.post('/mobile/auth/register', cors(), UserCtrl.createLocalUser);
    
    
    app.options('/mobile/googleLogin', cors());
    app.get('/mobile/googleLogin', cors(), passport.authenticate('google', {
        failureRedirect: 'http://localhost/failureCallback',
        successRedirect: 'http://localhost/successCallback'
    }));
};

var tester = function(req, res, next) {
    console.log('mobile endpoint running');
    if(next) {
        next();
    } else {
        res.send();
    }
}