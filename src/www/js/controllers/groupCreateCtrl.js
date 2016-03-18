angular.module('kitchenFriend')
.controller('groupCreateCtrl', function($scope, groupService, $state) {
    $scope.create = function(group) {
        groupService.create(group).then(function(response) {
            $state.go('Group.Home', {'groupId': response._id});
        });
    };
});