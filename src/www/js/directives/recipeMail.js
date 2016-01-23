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
                    console.log('refresh needed');
                    $state.go('Home');
                });
            };
            
            $scope.rejectMail = function(recipeId) {
                shareService.rejectShare(recipeId).then(function(data) {
                    $state.go('Home');
                });
            };
        }
    };
});