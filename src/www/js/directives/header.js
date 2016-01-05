angular.module('kitchenFriend')
.directive('myHeader', function() {
	return {
		templateUrl: 'html/templates/header.html',
		controller: function($scope) {
			$scope.loggedIn = false;
		}
	}
})