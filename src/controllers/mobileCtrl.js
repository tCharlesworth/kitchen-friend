var Mongoose = require('mongoose'),
    User = Mongoose.model('User'),
    Recipe = Mongoose.model('Recipe');

module.exports = {
    checkLoginLocal: function (req, res) {
        console.log('checking', req.body.email);
        User.findOne({ 'contactEmail': req.body.email }).populate('recipes').exec(function (findErr, findResult) {
            if (findErr) {
                return res.status(500).json(findErr);
            } else if (findResult) {
                // Check Password
                if (findResult.comparePassword(req.body.password)) {
                    delete findResult.auth;
                    res.json(findResult);
                } else {
                    res.status(401).json({ message: 'Invalid Password' });
                }
            } else {
                // User does not exist
                res.status(401).json({ message: 'User Not Found' });
            }
        });
    },

    getUsersRecipes: function (req, res) {
        console.log('Mobile Id Loading: ', req.params.userId);
        User.findOne({ _id: req.params.userId }).populate('recipes').exec(function (getErr, getResults) {
            if (getErr) {
                res.status(500).json(getErr);
            } else {
                console.log('This is what I found');
                delete getResults.auth;
                res.json(getResults);
            }
        });
    },

    addUserRecipe: function (req, res) {
        var user = req.params.userId;
        Recipe.create(req.body, function (createErr, newRecipe) {
            if (createErr) {
                res.status(500).json(createErr);
            } else {
                User.findByIdAndUpdate(user, { '$push': { 'recipes': newRecipe._id } }, function (updErr, updRes) {
                    if (updErr) {
                        res.status(500).json(updErr);
                    } else {
                        res.json(newRecipe);
                    }
                });
            }
        });
    },

    removeUserRecipe: function (req, res) {
        var user = req.params.userId;
        User.findByIdAndUpdate(user, {'$pull': {'recipes': req.query.recipeId}}, function(updErr, updRes) {
            if(updErr) {
                res.status(500).json(updErr);
            } else {
                res.json(updRes);
            }
        })
    }
};