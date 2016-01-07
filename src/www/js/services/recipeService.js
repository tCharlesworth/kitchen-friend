angular.module('kitchenFriend')
.service('recipeService', function($http) {
    this.getCurrentUsersRecipes = function() {
        return $http({
            method: 'GET',
            url: '/recipes'
        }).then(function(response) {
            return response.data;
        });
    }
});