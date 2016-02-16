var Mongoose    = require('mongoose'),
    User        = Mongoose.model('User');

module.exports = {
    createLocalUser: function(req, res) {
        console.log('creating: ', req.body);
        var newUser = req.body;
        //Make sure the username does not already exist
        User.findOne({username: newUser.username}).exec(function(findErr, theUser) {
            if(findErr) {
                console.log('FAILING 1');
                res.status(500).send(findErr);
            } else {
                if(theUser) {
                    //Username already exists
                    console.log('Username in use: ', theUser);
                    res.status(400).json('Username already exists.');
                } else {
                    //We can create
                    var realUser = new User();
                    realUser.username = newUser.username;
                    realUser.auth = {
                        local: realUser.hashPassword(req.body.password)
                    };
                    realUser.contactEmail = req.body.contactEmail;
                    console.log('realUser: ', realUser);
                    realUser.save(function(createErr) {
                        if(createErr) {
                            console.log('FAILING 2', createErr);
                            res.status(500).send(createErr);
                        } else {
                            //Send them back the new user
                            console.log('New user created successfully');
                            res.json(realUser);
                        }
                    });
                }
            }
        });
    },
    
    logout: function(req, res) {
        req.logout();
        res.send();
    },
    
    isAuthenticated: function (req, res, next) {
        if(!req.isAuthenticated()) {
            //Not Logged In!
            return res.sendStatus(401);
        }
        res.json(req.body);
    }
}