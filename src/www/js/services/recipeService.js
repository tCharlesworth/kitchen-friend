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
    }
    
    this.getRecipeById = function(recipeId) {
        return $http({
            method: 'GET',
            url: '/recipe/'+recipeId
        }).then(simpleReturn)
    }
    
    var simpleReturn = function(response) {
        return response.data;
    }
});