angular.module('kitchenFriend')
.directive('recipePreview', function() {
    return {
        templateUrl: 'html/templates/recipePreview.html',
        scope: {
            recipe: '='
        }
    };
})