angular.module('kitchenFriend').controller('browseRecipesCtrl', function($scope, publicRecipeService) {
    //Load Recipes
    publicRecipeService.getPublicRecipes().then(function(data) {
        $scope.recipes = data;
    });
});