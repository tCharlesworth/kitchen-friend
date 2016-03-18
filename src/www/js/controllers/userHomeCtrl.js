angular.module('kitchenFriend')
.controller('userHomeCtrl', function($scope, shareService, groupService) {
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
    
    groupService.getGroupInvites().then(function(response) {
        $scope.groupInvites = response;
        console.log('group invites: ', response);
    });
    
    $scope.acceptGroupInvite = function(groupId, idx) {
        groupService.acceptGroupInvite(groupId).then(function(response) {
            $scope.groupInvites.splice(idx, 1);
        });
    };
    
    $scope.rejectGroupInvite = function(groupId, idx) {
        groupService.rejectGroupInvite(groupId).then(function(response) {
            $scope.groupInvites.splice(idx, 1);
        });
    };
});