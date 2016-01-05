angular.module('kitchenFriend')
.service('authService', function($http) {
    this.createLocalUser = function(newUser) {
        return $http({
            method: 'POST',
            url: '/auth/signup',
            data: newUser
        });
    };
    
    this.localLogin = function(loginData) {
        return $http({
            method: 'POST',
            url: '/auth/local',
            data: loginData
        });
    }
});