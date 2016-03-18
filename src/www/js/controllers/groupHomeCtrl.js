angular.module('kitchenFriend')
.controller('groupHomeCtrl', function($scope, $state, groupService, $stateParams) {
    // asdf
    console.log('Gettting group: ', $stateParams.groupId);
    groupService.getGroupById($stateParams.groupId).then(function(response) {
        $scope.group = response;
        console.log('Got group: ', response);
    });
    
    $scope.leaveGroup = function() {
        if(window.confirm('Are you sure you want to leave this group?')) {
            groupService.leaveGroup($stateParams.groupId).then(function(result) {
                window.alert('You have left the group');
                $state.go('Home');
            });
        }
    };
});