angular.module('kitchenFriend')
.controller('userHomeCtrl', function($scope, shareService) {
    //Get Mail
    shareService.getUsersMail().then(function(data) {
        $scope.allMail = data.recipeShares;
        console.log('mail: ', data.recipeShares);
    });
    
    $scope.deleteFunction = function(recipeId) {
        for(var i = 0; i < $scope.allMail.length; i++) {
            if( $scope.allMail[i].recipeId._id === recipeId) {
                $scope.allMail.splice(i, 1);
            }
        }
    };
});