angular.module('kitchenFriend')
.service('publicRecipeService', function($http) {
    
    var simpleReturn = function(response) {
        return response.data;
    };
    
    this.getPublicRecipes = function() {
        return $http({
            method: 'GET',
            url: '/publicRecipes'
        }).then(simpleReturn);
    };
    
    this.shareNewRecipe = function(recipe) {
        return $http({
            method: 'POST',
            url: '/share/public',
            data: recipe
        }).then(simpleReturn);
    };
    
    this.getPublicRecipeById = function(recipeId) {
        return $http({
            method: 'GET',
            url: '/publicRecipes/'+recipeId
        }).then(simpleReturn);
    };
});