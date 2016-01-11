angular.module('kitchenFriend').directive('newLinkRecipe', function() {
    return {
      templateUrl: 'html/templates/newLinkRecipe.html',
      link: function(scope, ele, attrs) {
          scope.loading = false;//Used to show loading message
          scope.couldNotFindRecipe = false;//Used to show if link was not successful
          scope.foundRecipe = false; //Used to show results
          
          scope.findRecipe = function(url) {
              scope.loading = true;
          };
          
          scope.saveRecipe = function(recipe) {
              console.log('Saving');
          };
      }
    };
});