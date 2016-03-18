angular.module('kitchenFriend').directive('newUserRecipe', function (recipeService, $state) {
    return {
        templateUrl: 'html/templates/newUserRecipe.html',
        scope: {
            
        },
        link: function (scope, ele, attrs) {
            scope.newRecipe = {
                ingredients: [],
                directions: []
            };

            scope.addIngredient = function (newIngredient) {
                scope.newRecipe.ingredients.push(newIngredient);
                scope.newIngredient = '';
            };

            scope.removeIngredient = function (idx) {
                scope.newRecipe.ingredients.splice(idx, 1);
            };
            
            scope.orderIngredient = function(idx, dir) {
                var data = scope.newRecipe.ingredients[idx];
                scope.newRecipe.ingredients[idx] = scope.newRecipe.ingredients[idx+dir];
                scope.newRecipe.ingredients[idx+dir] = data;
            };

            scope.addDirection = function (newDirection) {
                scope.newRecipe.directions.push(newDirection);
                scope.newDirection = '';
            };
            
            scope.removeDirection = function(idx) {
                scope.newRecipe.directions.splice(idx, 1);
            };
            
            scope.orderDirection = function(idx, dir) {
                var data = scope.newRecipe.directions[idx];
                scope.newRecipe.directions[idx] = scope.newRecipe.directions[idx+dir];
                scope.newRecipe.directions[idx+dir] = data;
            };

            scope.saveRecipe = function () {
                //Save here
                // $('#save-new-user-recipe-button')
                //     .text('Saving...');
                if(validateRecipe()) {
                    console.log('Recipe Passed Validation');
                    //Save
                    recipeService.saveNewRecipe(scope.newRecipe).then(function(response) {
                       //Save successful, redirect to recipes!
                       console.log('Recipe Saved');
                       $state.go('Recipes');
                    });
                }
            };
            
            var validateRecipe = function() {
                //Name
                if(!scope.newRecipe.name) {
                    console.log('Name Failed');
                    return false;
                }
                //Short Description
                if(!scope.newRecipe.description) {
                    console.log('Description Failed');
                    return false;
                }
                //Prep Time
                if(scope.newRecipe.prepTime === null) {
                    console.log('Prep Time Failed');
                    return false;
                }
                //Cook Time
                if(scope.newRecipe.cookTime === null) {
                    console.log('Cook Time Failed');
                    return false;
                }
                //Ingredients
                if(!scope.newRecipe.ingredients) {
                    console.log('Ingredients Failed');
                    return false;
                }
                //Directions
                if(!scope.newRecipe.directions) {
                    console.log('Directions Failed');
                    return false;
                }
                
                return true;
            };
        }
    }
});