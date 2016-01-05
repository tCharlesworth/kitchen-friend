var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    name: {type: String},
    description: {type: String},
    instructions: {type: [{type: String}], default: ''},
    ingredients: {type: [{type: String}], default: ''},
    picture: {type: [{type: String}]}
});

module.exports = mongoose.model('Recipe', RecipeSchema);