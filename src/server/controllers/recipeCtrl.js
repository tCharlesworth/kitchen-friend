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
    }
};