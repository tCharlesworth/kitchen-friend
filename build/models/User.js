var mongoose = require('mongoose'),
    Schema =   mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    contactEmail: {type: String, unique: true},
    auth: {
        local: {
            email: {type: String, default: ''},
            password: {type: String, default: ''}
        },
        google: {type: String, default: ''}
    },
    recipes: {type: [{type: Schema.Types.ObjectId, ref: 'Recipe'}]},
    recipeShares: [{
        sender: {type: String},
        message: {type: String},
        recipeId: {type: Schema.Types.ObjectId, ref: 'Recipe'}
    }]
});

module.exports = mongoose.model('User', UserSchema);