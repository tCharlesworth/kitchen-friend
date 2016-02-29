var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = {
    getShoppingList: function (req, res) {
        User.findOne({ _id: req.user._id }, function (err, findResult) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.json(findResult);
            }
        });
    },
    
    addToShoppingList: function(req, res) {
        User.findByIdAndUpdate(req.user._id, {'$push': {'shoppingList': req.body}}, function(err, result) {
            if(err) {
                return res.status(400).json(err);
            } else {
                return res.json(result);
            }
        });
    },
    
    removeShoppingList: function(req, res) {
        User.findByIdAndUpdate(req.user._id, {'$push': {'shoppingList': req.body}}, function(err, result) {
            if(err) {
                return res.status(400).json(err);
            } else {
                return res.json(result);
            }
        });
    }
};