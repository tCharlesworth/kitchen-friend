var recipeCtrl = require('../controllers/recipeCtrl');

module.exports = function(app) {
    /*****Endpoints*****/
    app.get('/recipes', recipeCtrl.getRecipesByUserId);
    app.post('/recipes', recipeCtrl.createNewRecipe);
}