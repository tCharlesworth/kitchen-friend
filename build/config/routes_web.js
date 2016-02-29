var recipeCtrl       = require('../controllers/recipeCtrl'),
    publicRecipeCtrl = require('../controllers/publicRecipeCtrl'),
    shareRecipeCtrl  = require('../controllers/shareRecipeCtrl'),
    shoppingCtrl     = require('../controllers/shoppingCtrl');

module.exports = function(app) {
    /*****Endpoints*****/
    app.put('/api/updateRecipe', recipeCtrl.updateRecipe);
    app.put('/api/share/accept/:id', shareRecipeCtrl.acceptShare);
    app.put('/api/share/reject/:id', shareRecipeCtrl.rejectShare);
    
    app.get('/api/recipes', recipeCtrl.getRecipesByUserId);
    app.get('/api/recipe/:recipeId', recipeCtrl.getRecipeById);
    app.get('/api/share', shareRecipeCtrl.getCurrentUsersRecipes);
    app.get('/api/publicRecipes', publicRecipeCtrl.getPublicRecipes);
    app.get('/api/publicRecipes/:recipeId', publicRecipeCtrl.getRecipeById);
    app.get('/api/shoppingList', shoppingCtrl.getShoppingList);
    
    app.post('/api/recipes', recipeCtrl.createNewRecipe);
    app.post('/api/share/public', publicRecipeCtrl.createPublicRecipe);
    app.post('/api/share/user', shareRecipeCtrl.shareWithUser);
    app.post('/api/share/email', shareRecipeCtrl.shareWithEmail);
    app.post('/api/shoppingList', shoppingCtrl.addToShoppingList)
    
    app.delete('/api/recipe/:recipeId', recipeCtrl.deleteRecipe);
    app.delete('/api/shoppingList', shoppingCtrl.removeShoppingList);
};