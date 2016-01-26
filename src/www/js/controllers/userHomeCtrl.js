angular.module('kitchenFriend')
.controller('userHomeCtrl', function($scope, shareService) {
    //Get Mail
    shareService.getUsersMail().then(function(data) {
        $scope.allMail = data.recipeShares;
        console.log('mail: ', data.recipeShares);
    });
    
    $scope.deleteFunction = function(recipeId) {
        console.log('runing delete for: ', recipeId);
        for(var i = 0; i < $scope.allMail.length; i++) {
            if( $scope.allMail[i].recipeId._id === recipeId) {
                console.log('SPLICE: ', i);
                $scope.allMail.splice(i, 1);
            }
        }
        console.log('Done Deleting')
    };
});