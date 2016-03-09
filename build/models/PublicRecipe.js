var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    name: {type: String},
    description: {type: String},
    directions: {type: [{type: String}], default: []},
    ingredients: {type: [{type: String}], default: []},
    picture: {type: String},
    prepTime: {type: Number},
    cookTime: {type: Number},
    submitter: {type: Schema.Types.ObjectId, ref: 'User'},
    author: {type: String},
    saved: {type: Number}
});

module.exports = mongoose.model('PublicRecipe', RecipeSchema);