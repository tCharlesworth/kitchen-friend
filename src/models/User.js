var mongoose = require('mongoose'),
    Schema =   mongoose.Schema,
    BCrypt =    require('bcryptjs');

var salt = BCrypt.genSaltSync(10);

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    contactEmail: {type: String, unique: true},
    picture: {type: String},
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
    shoppingList: {type: [{type: String}], default: []},
    groups: {type: [{type: Schema.Types.ObjectId, ref: 'Group'}], default: []}, 
    groupInvites: {type: [{
        groupId: {type: Schema.Types.ObjectId, ref: 'Group'},
        invitedBy: {type: Schema.Types.ObjectId, ref: 'User'},
        dateInvited: {type: Date, default: Date.now}
    }], default: []}
});

UserSchema.methods.hashPassword = function(password) {
    return BCrypt.hashSync(password, salt);
};

UserSchema.methods.comparePassword = function(password) {
    return BCrypt.compareSync(password, this.auth.local);
};

module.exports = mongoose.model('User', UserSchema);