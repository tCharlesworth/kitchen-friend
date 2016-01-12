var mongoose = require('mongoose'),
    Schema =   mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true},
    contactEmail: {type: String},
    auth: {
        local: {
            email: {type: String, default: ''},
            password: {type: String, default: ''}
        },
        google: {type: String, default: ''}
    },
    recipes: {type: [{type: Schema.Types.ObjectId, ref: 'Recipe'}]}
});

module.exports = mongoose.model('User', UserSchema);