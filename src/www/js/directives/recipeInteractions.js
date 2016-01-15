angular.module('kitchenFriend').directive('recipeInteractions', function(recipeService) {
    return {
        templateUrl: 'html/templates/recipeInteractions.html',
        scope: {
            recipeId: '=',
            layout: '@'
        },
        controller: function($scope, $state) {
            $scope.classStuff = {
                'recipe-interactions-expanded-fixed': ($scope.layout === 'expanded-fixed')
            };
            
            $scope.editRecipe = function() {
                if($scope.recipeId) {
                    $state.go('RecipeEdit', {recipeId: $scope.recipeId});
                }
            };
            
            $scope.shareRecipe = function() {
                if($scope.recipeId) {
                    $state.go('RecipeShare', {recipeId: $scope.recipeId});
                }
            };
            
            $scope.deleteRecipe = function() {
                if($scope.recipeId) {
                    recipeService.deleteRecipe($scope.recipeId).then(function(data) {
                        $state.go('Recipes');
                    });
                }
            };
        } 
    };
});