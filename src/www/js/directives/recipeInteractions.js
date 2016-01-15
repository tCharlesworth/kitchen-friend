angular.module('kitchenFriend').directive('recipeInteractions', function() {
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
                console.log('going: ', $scope.recipeId);
                if($scope.recipeId) {
                    $state.go('RecipeEdit', {recipeId: $scope.recipeId});
                }
            };
            
            $scope.shareRecipe = function() {
                console.log('Sharing: ', $scope.recipeId);
                if($scope.recipeId) {
                    $state.go('RecipeShare', {recipeId: $scope.recipeId});
                }
            }
        } 
    };
});