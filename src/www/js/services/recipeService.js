angular.module('kitchenFriend')
.service('recipeService', function($http) {
    this.getCurrentUsersRecipes = function() {
        return $http({
            method: 'GET',
            url: '/api/recipes'
        }).then(simpleReturn);
    }
    
    this.saveNewRecipe = function(newRecipe) {
        return $http({
            method: 'POST',
            url: '/api/recipes',
            data: newRecipe
        }).then(simpleReturn);
    };
    
    this.getRecipeById = function(recipeId) {
        return $http({
            method: 'GET',
            url: '/api/recipe/'+recipeId
        }).then(simpleReturn);
    };
    
    this.updateRecipe = function(recipe) {
        return $http({
            method: 'PUT',
            url: '/api/updateRecipe',
            data: recipe
        }).then(simpleReturn);
    };
    
    this.deleteRecipe = function(recipeId) {
        return $http({
            method: 'DELETE',
            url: '/api/recipe/'+recipeId
        }).then(simpleReturn);
    };
    
    var simpleReturn = function(response) {
        return response.data;
    };
});