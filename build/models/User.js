var mongoose = require('mongoose'),
    Schema =   mongoose.Schema,
    BCrypt =    require('bcryptjs');

var salt = BCrypt.genSaltSync(10);

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    contactEmail: {type: String, unique: true},
    auth: {
        local: {type: String, default: ''},
        google: {type: String, default: ''}
    },
    recipes: {type: [{type: Schema.Types.ObjectId, ref: 'Recipe'}]},
    recipeShares: [{
        sender: {type: String},
        message: {type: String},
        recipeId: {type: Schema.Types.ObjectId, ref: 'Recipe'}
    }],
    createdOn: {type: Date, default: Date.now()},
    shoppingList: {type: [{type: String}], default: []}
});

UserSchema.methods.hashPassword = function(password) {
    return BCrypt.hashSync(password, salt);
};

UserSchema.methods.comparePassword = function(password) {
    return BCrypt.compareSync(password, this.auth.local);
};

module.exports = mongoose.model('User', UserSchema);