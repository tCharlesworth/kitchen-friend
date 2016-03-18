angular.module('kitchenFriend')
.directive('comment', function() {
    return {
        templateUrl: 'html/templates/comment.html',
        scope: {
            commentData: '='
        },
        controller: function($scope) {
            
        }
    };
});