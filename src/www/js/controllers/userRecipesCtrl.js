angular.module('kitchenFriend').controller('userRecipesCtrl', function($scope, recipeService) {
    var loadRecipes = function() {
        recipeService.getCurrentUsersRecipes().then(function(data) {
            $scope.recipes = data.recipes;
        });
    };
    
    loadRecipes();
});