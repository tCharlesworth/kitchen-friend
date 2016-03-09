var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var CommentSchema = new Schema({
    user: {type: Schema.Types.ObjectId},
    message: {type: String},
    date: {type: Date, default: Date.now}
});

var groupRecipeSchema = new Schema({
    name: {type: String},
    description: {type: String},
    directions: {type: [{type: String}], default: ''},
    ingredients: {type: [{type: String}], default: ''},
    picture: {type: String},
    prepTime: {type: Number},
    cookTime: {type: Number},
    submitter: {type: Schema.Types.ObjectId, ref: 'User'},
    author: {type: String},
    saved: {type: Number},
    comments: [{
        type: CommentSchema
    }]
});

module.exports = mongoose.model('PublicRecipe', groupRecipeSchema);