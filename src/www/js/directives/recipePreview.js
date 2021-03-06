angular.module('kitchenFriend')
.directive('recipePreview', function() {
    return {
        templateUrl: 'html/templates/recipePreview.html',
        scope: {
            recipe: '=',
            browse: '@',
            group: '@'
        },
        controller: function($scope, $state) {
            $scope.openRecipe = function() {
                
                console.log('CLICKED VIEW WITH: ', $scope.browse);
                if($scope.browse) {
                    $state.go('RecipePublic', {recipeId: $scope.recipe._id});
                } else if($scope.group) {
                    $state.go('Group.RecipeView', {recipeId: $scope.recipe._id});
                } else {
                    $state.go('Recipe', {recipeId: $scope.recipe._id});
                }
            };
        }
    };
});