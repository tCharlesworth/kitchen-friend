angular.module('kitchenFriend').directive('recipeMail', function() {
    return {
        templateUrl: 'html/templates/recipeMail.html',
        scope: {
            mail: '=',
            deleteFunction: '&delete'
        },
        controller: function($scope, shareService, $state) {
            $scope.message = $scope.mail;
            console.log('MESSAGE: ', $scope.message);
            $scope.acceptMail = function(recipeId) {
                shareService.acceptShare(recipeId).then(function() {
                    console.log('refresh needed: ', recipeId);
                    $scope.deleteFunction({'recipeId': recipeId});
                });
            };
            
            $scope.rejectMail = function(recipeId) {
                console.log('REJECTING');
                shareService.rejectShare(recipeId).then(function(data) {
                    console.log('refresh Needed from rejecting: ', data);
                    
                    $scope.deleteFunction({'recipeId': recipeId});
                });
            };
        }
    };
});