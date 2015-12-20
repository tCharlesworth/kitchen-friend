var mongoose = require('mongoose'),
    Schema =   mongoose.Schema;

var UserSchema = new Schema({
    auth: {
        google: {type: String},
        facebook: {type: String}
    },
    recipes: {type: [{type: Schema.Types.ObjectId}], ref: 'Recipe'}
});

module.exports = mongoose.model('User', UserSchema);