angular.module('kitchenFriend')
.directive('myHeader', function() {
	return {
		templateUrl: 'html/templates/header.html',
        scope: {
            forceAuth: '@'
        },
		controller: function($scope, authService, $state) {
			$scope.loggedIn = false;
            
            authService.getAuth().then(function(authData) {
                $scope.loggedIn = true;
                console.log('User logged in: ', authData);
            }).catch(function(error) {
                $scope.loggedIn = false;
                console.log('No user logged in', $scope.forceAuth);
                if($scope.forceAuth) {
                    $state.go('Login');
                }
            });
            
            $scope.logout = function() {
                authService.logout().then(function(response) {
                    $state.go('Login');
                });
            };
            
		}
	}
})