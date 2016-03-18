angular.module('kitchenFriend')
.controller('groupDashboardCtrl', function($scope, groupService) {
    //Load Recipes
    groupService.getMyGroups().then(function(response) {
        console.log('groups: ', response);
        $scope.groups = response.groups;
    });
});