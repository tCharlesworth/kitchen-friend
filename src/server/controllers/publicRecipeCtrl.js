var mongoose = require('mongoose'),
    PublicRecipe = mongoose.model('PublicRecipe');

module.exports = {
    createPublicRecipe: function(req, res) {
        //Get info
        var recipe = req.body;
        recipe.submitter = req.user._id;
        recipe.author = req.user.username;
        recipe.save = 0;
        PublicRecipe.create(recipe, function(createErr, newPublicRecipe) {
            if(createErr) {
                res.status(500).json(createErr);
            } else {
                res.json(newPublicRecipe);
            }
        });
    },
    
    getPublicRecipes: function(req, res) {
        PublicRecipe.find().exec(function(findErr, results) {
            if(findErr) {
                res.status(500).json(findErr);
            } else {
                res.json(results);
            }
        });
    },
    
    getRecipeById: function(req, res) {
        PublicRecipe.findById(req.params.recipeId, function(findErr, findResult) {
            if(findErr) {
                res.status(500).json(findErr);
            } else {
                res.json(findResult);
            }
        });
    }
};