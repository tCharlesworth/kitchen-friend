angular.module('kitchenFriend')
.controller('userHomeCtrl', function($scope, shareService) {
    //Get Mail
    shareService.getUsersMail().then(function(data) {
        $scope.allMail = data.recipeShares;
        console.log('mail: ', data.recipeShares);
    });
    
    $scope.deleteFunction = function(recipeId) {
        
    };
});