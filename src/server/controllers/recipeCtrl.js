var mongoose = require('mongoose'),
    Recipe = mongoose.model('Recipe'),
    User = mongoose.model('User');

module.exports = {
    getRecipesByUserId: function(req, res) {
        User.find({_id: req.user._id}).populate('recipes').exec(function(err, result) {
            if(err) {
                res.json({msg: err});
            } else {
                console.log("Found: ", result);
                res.json({recipes: result.recipes})
            }
        });
    }
};