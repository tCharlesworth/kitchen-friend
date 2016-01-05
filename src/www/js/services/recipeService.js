angular.module('kitchenFriend')
.service('recipeService', function($http) {
    this.getRecipesByUserId = function(userId) {
        return $http({
            method: 'GET',
            url: '/recipes/'+userId
        });
    }
});