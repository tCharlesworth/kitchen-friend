var mongoose = require('mongoose'),
    Recipe = mongoose.model('Recipe'),
    User = mongoose.model('User');

module.exports = {
    getRecipesByUserId: function(req, res) {
        console.log('Getting Recipes for: ', req.user._id);
        User.findOne({_id: req.user._id}).populate('recipes').exec(function(err, result) {
            if(err) {
                res.json({msg: err});
            } else {
                console.log('Found: ', result.recipes);
                res.json({recipes: result.recipes});
            }
        });
    },
    
    //VERIFY LOGGED IN FIRST
    createNewRecipe: function(req, res) {
        var recipeData = req.body;
        //Create the new Recipe
        Recipe.create(recipeData, function(createErr, newRecipe){
            if(createErr) {
                res.status(500).json(createErr);
            } else {
                //New recipe has been created. Lets add the id to the
                //current user
                User.find({_id: req.user._id}).update({$push: {recipes: newRecipe._id}}).exec(function(updateErr, updatedUser) {
                    if(updateErr) {
                        res.status(500).json(updateErr);
                    } else {
                        //Success. Return the new recipe
                        res.json({recipe: newRecipe});
                    }
                });
            }
        });
    },
    
    getRecipeById: function(req, res) {
        Recipe.findOne({_id: req.params.recipeId}).exec(function(findErr, findResults) {
            if(findErr) {
                res.status(500).json(findErr);
            } else {
                res.json(findResults);
            }
        });
    },
    
    updateRecipe: function(req, res) {
        Recipe.findByIdAndUpdate(req.body._id, req.body, function(updErr, updResult) {
            if(updErr) {
                res.status(500).json(updErr);
            } else {
                res.json(updResult);
            }
        })
    },
    
    deleteRecipe: function(req, res) {
        //Make sure recipe belongs to user
        if(req.user.recipes.indexOf(req.params.recipeId) !== -1) {
            //Delete From User
            User.findByIdAndUpdate(req.user._id, {$pull: {recipes: req.params.recipeId}}, function(updErr, updResults) {
                if(updErr) {
                    res.status(500).json(updErr);
                } else {
                    //Delete from recipes database
                    Recipe.findByIdAndRemove(req.params.recipeId, function(deleteErr, deleteResponse) {
                        if(deleteErr) {
                            res.status(500).json(deleteErr);
                        } else {
                            //Success.
                            res.json(updResults);
                        }
                    });
                }
            })
        } else {
            res.status(403).send();
        }
    },
    
    shareWithUser: function(req, res) {
        var recipeInfo = req.body;
        //Verify to user exists
        User.findOne({username: recipeInfo.to}, function(findErr, findResult) {
            if(findErr) {
                res.status(500).json(findErr);
            } else if(findResult) {
                //Create a duplicate of this recipe
                Recipe.create(recipeInfo.recipe, function(createErr, newRecipe) {
                    if(createErr) {
                        res.status(500).json(createErr);
                    } else {
                        //Add it to the found user
                        User.findByIdAndUpdate(findResult._id, {$push: {recipes: newRecipe._id}}, function(updateErr, updateResult) {
                            if(updateErr) {
                                res.status(500).json(updateErr);
                            } else {
                                res.json(newRecipe);
                            }
                        });
                    }
                });
            } else {
                //That user does not exist
                res.status(403).json({message: 'User does not exist'});
            }
        });
    }
};