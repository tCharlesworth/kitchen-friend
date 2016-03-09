console.log('Loading Group Recipe Schema');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var groupRecipeSchema = new Schema({
    name: {type: String},
    description: {type: String},
    directions: {type: [{type: String}], default: []},
    ingredients: {type: [{type: String}], default: []},
    picture: {type: String},
    prepTime: {type: Number},
    cookTime: {type: Number},
    submitter: {type: Schema.Types.ObjectId, ref: 'User'},
    submitterName: {type: String},
    saved: {type: Number, default: 0},
    favorited: {type: [{type: Schema.Types.ObjectId, ref: 'User'}], default: []},
    comments: [{
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        username: {type: String},
        message: {type: String},
        date: {type: Date, default: Date.now}
    }]
});

module.exports = mongoose.model('GroupRecipe', groupRecipeSchema);
console.log('DONE...');