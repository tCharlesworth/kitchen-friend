var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: {type: String},
    description: {type: String},
    recipes: {type: [{type: Schema.Types.ObjectId, ref: 'Recipe'}], default: []},
    administrators: [{type: Schema.Types.ObjectId, ref: 'User'}],
    members: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Group', GroupSchema);