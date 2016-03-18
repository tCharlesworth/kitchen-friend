angular.module('kitchenFriend')
.service('publicRecipeService', function($http) {
    
    var simpleReturn = function(response) {
        return response.data;
    };
    
    this.getPublicRecipes = function() {
        return $http({
            method: 'GET',
            url: '/api/publicRecipes'
        }).then(simpleReturn);
    };
    
    this.shareNewRecipe = function(recipe) {
        return $http({
            method: 'POST',
            url: '/api/share/public',
            data: recipe
        }).then(simpleReturn);
    };
    
    this.getPublicRecipeById = function(recipeId) {
        return $http({
            method: 'GET',
            url: '/api/publicRecipes/'+recipeId
        }).then(simpleReturn);
    };
});