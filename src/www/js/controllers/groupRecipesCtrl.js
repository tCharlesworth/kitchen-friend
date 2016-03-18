angular.module('kitchenFriend')
.controller('groupRecipesCtrl', function($scope, groupService, $stateParams) {
    groupService.getGroupById($stateParams.groupId).then(function(response) {
        $scope.recipes = response.recipes;
        console.log('Got Recipes:',$scope.recipes);
    });
})