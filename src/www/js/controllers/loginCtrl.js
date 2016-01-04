angular.module('kitchenFriend')
.controller('loginCtrl', function($scope) {
    
	$scope.localLogin = function(tryUser) {
        console.log("Logging in as: ", tryUser);
    };
    
    $scope.localSignup = function(newUser) {
        console.log("Signup up locally with: ", newUser);
    };
    
    $scope.googleLogin = function() {
        console.log("Logging in with google");
    };
    
    $scope.googleSignup = function() {
        console.log("Signup with google!");
    };
});