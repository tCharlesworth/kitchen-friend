angular.module('kitchenFriend')
.controller('loginCtrl', function($scope, authService) {
    
	$scope.localLogin = function(tryUser) {
        console.log('Logging in as: ', tryUser);
        authService.localLogin(tryUser).then(function(result) {
            if(result) {
                //Redirect :)
                console.log('Login Success');
            }
        }).catch(function(err) {
            console.log('Login Error: ', err);
        });
    };
    
    $scope.localSignup = function(newUser) {
        console.log('Signup up locally with: ', newUser);
        authService.createLocalUser(newUser).then(function(result) {
            if(result) {
                //Created account successfully
                console.log('Account Created');
            }
        }).catch(function(err) {
            console.log('Account not created');
            if(err.data === 'Username already exists.') {
                window.alert('Username in use, please try again.');
            }
        });
    };
});