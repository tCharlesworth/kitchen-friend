angular.module('kitchenFriend').controller('recipeCtrl', function($scope, $stateParams, recipeService) {
    $scope.isLoading = true;
    //Load the recipe
    recipeService.getRecipeById($stateParams.recipeId).then(function(data) {
        $scope.recipe = data;
        $scope.isLoading = false;
        console.log('GOT RECIPE: ', data);
    });
});