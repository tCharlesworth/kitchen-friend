angular.module('kitchenFriend')
.service('recipeService', function($http) {
    this.getCurrentUsersRecipes = function() {
        return $http({
            method: 'GET',
            url: '/recipes'
        }).then(simpleReturn);
    }
    
    this.saveNewRecipe = function(newRecipe) {
        return $http({
            method: 'POST',
            url: '/recipes',
            data: newRecipe
        }).then(simpleReturn);
    };
    
    this.getRecipeById = function(recipeId) {
        return $http({
            method: 'GET',
            url: '/recipe/'+recipeId
        }).then(simpleReturn);
    };
    
    this.updateRecipe = function(recipe) {
        return $http({
            method: 'PUT',
            url: '/updateRecipe',
            data: recipe
        }).then(simpleReturn);
    };
    
    this.deleteRecipe = function(recipeId) {
        return $http({
            method: 'DELETE',
            url: '/recipe/'+recipeId
        }).then(simpleReturn);
    };
    
    this.shareUser = function(recipeInfo) {
        return $http({
            method: 'POST',
            url: '/share/user',
            data: recipeInfo
        }).then(simpleReturn);
    };
    
    var simpleReturn = function(response) {
        return response.data;
    };
});