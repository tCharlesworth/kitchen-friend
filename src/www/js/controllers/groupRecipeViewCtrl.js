angular.module('kitchenFriend').controller('groupRecipeViewCtrl', function($scope, $stateParams, groupService) {
    // Get the recipe
    var getRecipes = function() {
        groupService.getRecipeById($stateParams.recipeId).then(function(response) {
            $scope.recipe = response;
        });
    };
    getRecipes();

    $scope.addComment = function(comment) {
        groupService.addRecipeComment(comment, $stateParams.recipeId).then(function(response) {
            $scope.newCommentText = '';
            $scope.showNewComment = false;
            getRecipes();
        });
    };
});