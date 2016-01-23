angular.module('kitchenFriend')
.service('shareService', function($http) {
    
    this.shareUser = function(recipeInfo) {
        return $http({
            method: 'POST',
            url: '/api/share/user',
            data: recipeInfo
        }).then(simpleReturn);
    };
    
    this.shareEmail = function(recipeInfo) {
        return $http({
            method: 'POST',
            url: '/api/share/email',
            data: recipeInfo
        }).then(simpleReturn);
    };
    
    this.getUsersMail = function() {
        return $http({
            method: 'GET',
            url: '/api/share'
        }).then(simpleReturn);
    };
    
    this.acceptShare = function(recipeId) {
        console.log('Sending Id: ', recipeId);
        return $http({
            method: 'PUT',
            url: '/api/share/accept/'+recipeId
        }).then(simpleReturn);
    };
    
    this.rejectShare = function(recipeId) {
        return $http({
            method: 'PUT',
            url: '/api/share/reject/'+recipeId
        }).then(simpleReturn);
    };
    
    var simpleReturn = function(response) {
        return response.data;
    };
});