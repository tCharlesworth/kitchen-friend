angular.module('kitchenFriend').controller('recipeCtrl', function($scope, $stateParams, recipeService) {
    console.log('Need to load recipe: ', $stateParams.recipeId);
    $scope.isLoading = true;
    //Load the recipe
    recipeService.getRecipeById($stateParams.recipeId).then(function(data) {
        console.log('GOT IT', data);
        $scope.recipe = data;
        $scope.isLoading = false;
    });
});