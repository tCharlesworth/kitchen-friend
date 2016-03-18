angular.module('kitchenFriend').controller('recipeEditCtrl', function($scope, $state, $stateParams, recipeService) {
    //Load Recipe
    if($stateParams.recipeId) {
        recipeService.getRecipeById($stateParams.recipeId).then(function(results) {
            $scope.recipe = results;
        });
    } else {
        console.log('Could not find recipe Id');
        $state.go('Home');
    }
    
    $scope.saveChanges = function() {
        recipeService.updateRecipe($scope.recipe).then(function(results) {
            $state.go('Recipe', {recipeId: results._id});
        });
    };
});