angular.module('kitchenFriend').controller('cookCtrl', function($scope, recipeService) {
    //Load currently cooking recipes
    recipeService.getCookedRecipes().then(function(results) {
        $scope.recipes = results;
    });
});