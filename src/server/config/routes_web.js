var recipeCtrl = require('../controllers/recipeCtrl'),
    publicRecipeCtrl = require('../controllers/publicRecipeCtrl'),
    shareRecipeCtrl = require('../controllers/shareRecipeCtrl');

module.exports = function(app) {
    /*****Endpoints*****/
    app.put('/updateRecipe', recipeCtrl.updateRecipe);
    app.put('/api/share/accept/:id', shareRecipeCtrl.acceptShare);
    app.put('/api/share/reject/:id', shareRecipeCtrl.rejectShare);
    
    app.get('/recipes', recipeCtrl.getRecipesByUserId);
    app.get('/recipe/:recipeId', recipeCtrl.getRecipeById);
    app.get('/publicRecipes', publicRecipeCtrl.getPublicRecipes);
    app.get('/api/share', shareRecipeCtrl.getCurrentUsersRecipes);
    
    app.post('/recipes', recipeCtrl.createNewRecipe);
    app.post('/api/share/public', publicRecipeCtrl.createPublicRecipe);
    app.post('/api/share/user', shareRecipeCtrl.shareWithUser);
    app.post('/api/share/email', shareRecipeCtrl.shareWithEmail);
    
    app.delete('/recipe/:recipeId', recipeCtrl.deleteRecipe);
};