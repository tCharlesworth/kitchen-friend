var recipeCtrl       = require('../controllers/recipeCtrl'),
    publicRecipeCtrl = require('../controllers/publicRecipeCtrl'),
    shareRecipeCtrl  = require('../controllers/shareRecipeCtrl'),
    shoppingCtrl     = require('../controllers/shoppingCtrl'),
    groupCtrl        = require('../controllers/groupCtrl');

module.exports = function(app) {
    /*****Endpoints*****/
    app.put('/api/updateRecipe', recipeCtrl.updateRecipe);
    app.put('/api/share/accept/:id', shareRecipeCtrl.acceptShare);
    app.put('/api/share/reject/:id', shareRecipeCtrl.rejectShare);
    app.put('/api/groupMembers', groupCtrl.makeGroupMemberAdmin);
    app.put('/api/groupInvites/accept', groupCtrl.acceptInvite);
    app.put('/api/groupInvites/reject', groupCtrl.rejectInvite);
    app.put('/api/leaveGroup', groupCtrl.leaveGroup);
    
    app.get('/api/recipes', recipeCtrl.getRecipesByUserId);
    app.get('/api/recipe/:recipeId', recipeCtrl.getRecipeById);
    app.get('/api/share', shareRecipeCtrl.getCurrentUsersRecipes);
    app.get('/api/publicRecipes', publicRecipeCtrl.getPublicRecipes);
    app.get('/api/publicRecipes/:recipeId', publicRecipeCtrl.getRecipeById);
    app.get('/api/shoppingList', shoppingCtrl.getShoppingList);
    app.get('/api/myGroups', groupCtrl.getMyGroups);
    app.get('/api/groups/:groupId', groupCtrl.getById);
    app.get('/api/groupMembers/:groupId', groupCtrl.getMembers);
    app.get('/api/groupInvites', groupCtrl.getInvites);
    app.get('/api/groupRecipes', groupCtrl.getRecipeById);
    
    app.post('/api/recipes', recipeCtrl.createNewRecipe);
    app.post('/api/share/public', publicRecipeCtrl.createPublicRecipe);
    app.post('/api/share/user', shareRecipeCtrl.shareWithUser);
    app.post('/api/share/email', shareRecipeCtrl.shareWithEmail);
    app.post('/api/shoppingList', shoppingCtrl.addToShoppingList);
    app.post('/api/groups', groupCtrl.createGroup);
    app.post('/api/groupMembers', groupCtrl.inviteNewGroupMember);
    app.post('/api/groupRecipes', groupCtrl.addRecipe);
    app.post('/api/groupRecipeComments', groupCtrl.addRecipeComment);
    
    app.delete('/api/recipe/:recipeId', recipeCtrl.deleteRecipe);
    app.delete('/api/shoppingList', shoppingCtrl.removeShoppingList);
    app.delete('/api/groups', groupCtrl.destroyGroup);
};