var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    name: {type: String},
    description: {type: String},
    instructions: {type: [{type: String}], default: ''},
    ingredients: {type: [{type: String}], default: ''},
    picture: {type: String},
    prepTime: {type: Number},
    cookTime: {type: Number}
});

module.exports = mongoose.model('Recipe', RecipeSchema);