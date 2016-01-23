var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Recipe = mongoose.model('Recipe');

module.exports = {
    getCurrentUsersRecipes: function(req, res) {
        User.findOne({_id: req.user._id}).populate('recipeShares.recipeId').exec(function(findErr, findResult) {
            if(findErr) {
                res.status(500).json(findErr);
            } else {
                console.log('uhhh, ', findResult);
                res.json(findResult);
            }
        });
    },
    shareWithUser: function(req, res) {
        var recipeInfo = req.body;
        //Verify to user exists
        console.log('Recipe Info: ', recipeInfo);
        User.findOne({username: recipeInfo.to}, function(findErr, findResult) {
            if(findErr) {
                res.status(500).json(findErr);
            } else if(findResult) {
                //Add To User
                var shareable = {
                    sender: recipeInfo.from,
                    message: recipeInfo.message,
                    recipeId: recipeInfo.recipeId
                };
                User.findOne({username: recipeInfo.to}).update({$push: {'recipeShares': shareable}}).exec(function(addErr, addResult) {
                    if(addErr) {
                        res.status(500).send(addErr);
                    } else {
                        res.json(addResult.recipeShares);
                    }
                });
            } else {
                //That user does not exist
                console.log('User does not exist');
                res.status(400).json({message: 'User does not exist'});
            }
        });
    },
    
    shareWithEmail: function(req, res) {
        //See nodemailer package :)
        
        res.send();
    },
    
    acceptShare: function(req, res) {
        console.log('****ACCEPTING THE SHARE****');
        console.log('Req Params: ', req.params);
        // res.send();
        //Remove from my mail list
        User.findOne({_id: req.user._id}).update({$pull: {'recipeShares': {$in: req.params.id}}}).exec(function(findErr, findRes) {
            if(findErr) {
                res.status(500).json(findErr);
            } else {
                console.log('Found the user: ', findRes);
                //Create the new recipe
                Recipe.findById(req.params.id, function(findRecipeErr, findRecipeResult) {
                    if(findRecipeErr) {
                        res.status(500).json(findRecipeErr);
                    } else if(findRecipeResult) {
                        var theNewRecipe = {
                            name: findRecipeResult.name,
                            description: findRecipeResult.description,
                            directions: findRecipeResult.directions,
                            ingredients: findRecipeResult.ingredients,
                            picture: findRecipeResult.picture,
                            prepTime: findRecipeResult.prepTime,
                            cookTime: findRecipeResult.cookTime
                        };
                        console.log('Found the Recipe: ', theNewRecipe);
                        Recipe.create(theNewRecipe, function(createErr, newRecipe) {
                            if(createErr) {
                                console.error('Create Error: ', createErr);
                                res.status(500).json(createErr);
                            } else {
                                console.log('Created new Recipe: ', newRecipe);
                                User.findOne({_id: req.user._id}).update({$push: {'recipes': newRecipe._id}}).exec(function(addErr, addRes) {
                                    if(addErr) {
                                        res.status(500).json(addErr);
                                    } else {
                                        console.log('User updated: ', addRes);
                                        res.json(addRes);
                                    }
                                });
                            }
                        });
                    } else {
                        console.error('Id Not Valid!');
                        res.sendStatus(501);
                    }
                });
            }
        });
    },
    
    rejectShare: function(req, res) {
        
    }
};