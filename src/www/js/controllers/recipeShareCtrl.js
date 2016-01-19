angular.module('kitchenFriend').controller('recipeShareCtrl', function($scope, $state, $stateParams, recipeService, publicRecipeService) {
    // Load the recipe
    recipeService.getRecipeById($stateParams.recipeId).then(function(data) {
        $scope.recipe = data;
    });
    
    $scope.currentView = 0;
    
    $scope.shareRecipePublic = function() {
        if($scope.termsCheck) {
            publicRecipeService.shareNewRecipe($scope.recipe).then(function(){
                //Redirect
                $state.go('BrowseRecipes');
            });
        }
    };
    
    $scope.shareRecipeWithUser = function(shareInfo) {
        shareInfo.recipeId = $stateParams.recipeId;
        shareInfo.recipe = $scope.recipe;
        recipeService.shareUser().then(function() {
            //Redirect
            $state.go('Home');
        });
    };
});