var recipeCtrl = require('../controllers/recipeCtrl'),
    publicRecipeCtrl = require('../controllers/publicRecipeCtrl');

module.exports = function(app) {
    /*****Endpoints*****/
    app.put('/updateRecipe', recipeCtrl.updateRecipe);
    
    app.get('/recipes', recipeCtrl.getRecipesByUserId);
    app.get('/recipe/:recipeId', recipeCtrl.getRecipeById);
    app.get('/publicRecipes', publicRecipeCtrl.getPublicRecipes);
    
    app.post('/recipes', recipeCtrl.createNewRecipe);
    app.post('/share/public', publicRecipeCtrl.createPublicRecipe);
    app.post('/share/user', recipeCtrl.shareWithUser);
    app.post('/share/email', recipeCtrl.shareWithEmail);
    
    app.delete('/recipe/:recipeId', recipeCtrl.deleteRecipe);
}