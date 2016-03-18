angular.module('kitchenFriend').controller('recipePublicCtrl', function($scope, publicRecipeService, $stateParams) {
    //Load the recipe
    publicRecipeService.getPublicRecipeById($stateParams.recipeId).then(function(data) {
        $scope.recipe = data;
        $scope.isLoading = false;
        console.log('GOT RECIPE: ', data);
    });
});