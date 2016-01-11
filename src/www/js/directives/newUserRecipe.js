angular.module('kitchenFriend').directive('newUserRecipe', function() {
    return {
        templateUrl: 'html/templates/newUserRecipe.html',
        link: function(scope, ele, attrs) {
            scope.newRecipe = {
                ingredients: [],
                directions: []
            };
            
            scope.addIngredient = function(newIngredient) {
                scope.newRecipe.ingredients.push(newIngredient);
                scope.newIngredient = '';
            };
            
            scope.addDirection = function(newDirection) {
                scope.newRecipe.directions.push(newDirection);
                scope.newDirection = '';
            };
            
            scope.saveRecipe = function(newRecipe) {
                //Save here
                $('#save-new-user-recipe-button')
                    .text('Saving...');
                
            };
        }
    }
});