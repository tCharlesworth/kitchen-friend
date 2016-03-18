angular.module('kitchenFriend')
.controller('groupMemberCtrl', function($scope, groupService, $stateParams) {
    groupService.getGroupMembers($stateParams.groupId).then(function(response) {
        console.log('Got Groupies: ', response);
        $scope.members = response.members;
        $scope.admins = response.administrators;
    });
});