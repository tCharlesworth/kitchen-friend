angular.module("kitchenFriend").service('shoppingListService', function($http) {
    var simpleDataReturn = function(response) {
        return response.data;
    };
    
    var simpleErrHandler = function(err) {
        console.error(err);
        return null;
    };
    
    this.getUsersList = function(userId) {
        var url = '/api/shoppingList';
        if(userId) {
            url+='?userId='+userId;
        }
        return $http({
            method: 'GET',
            url: url
        }).then(simpleDataReturn)
          .catch(simpleErrHandler);
    };
    
    this.addItemToList = function(item) {
        return $http({
            method: 'POST',
            url: '/api/shoppingList',
            data: item
        }).then(simpleDataReturn)
          .catch(simpleErrHandler);
    };
    
    this.removeItemFromList = function(item) {
        return $http({
            method: 'DELETE',
            url: '/api/shoppingList',
            data: item
        }).then(simpleDataReturn)
          .catch(simpleErrHandler);
    };
});