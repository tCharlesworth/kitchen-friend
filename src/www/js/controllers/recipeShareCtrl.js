angular.module('kitchenFriend').controller('recipeShareCtrl', function($scope, $state, $stateParams, groupService, recipeService, shareService, publicRecipeService) {
    // Load the recipe
    recipeService.getRecipeById($stateParams.recipeId).then(function(data) {
        $scope.recipe = data;
    });
    
    groupService.getMyGroups().then(function(response) {
        $scope.groups = response.groups;
        console.log('Found Groups: ', $scope.groups);
    });
    
    $scope.currentView = 0;
    
    $scope.shareRecipePublic = function() {
        if($scope.termsCheck) {
            publicRecipeService.shareNewRecipe($scope.recipe).then(function(){
                //Redirect
                $state.go('BrowseRecipes');
            });
        }
    };
    
    $scope.shareRecipeWithUser = function(shareInfo) {
        console.log('Shareing', shareInfo);
        shareInfo.recipeId = $stateParams.recipeId;
        shareService.shareUser(shareInfo).then(function() {
            //Redirect
            $state.go('Home');
        }).catch(function(err) {
            console.log('FOUND THE ERROR: ', err);
            if(err.data.message === 'User does not exist') {
                alert('Sorry, that user does not exist.');
            }
        });
    };
    
    $scope.shareWithEmail = function(shareInfo) {
        shareInfo.recipe = $scope.recipe;
        shareService.shareEmail().then(function() {
            $state.go('Home');
        });
    };
    
    $scope.shareWithGroup = function(shareInfo) {
        console.log('Shareing: ', shareInfo);
        shareService.shareToGroup(shareInfo._id, $scope.recipe._id).then(function(response) {
            $state.go('Home');
        });
    };
});