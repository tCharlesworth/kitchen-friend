angular.module('kitchenFriend').directive('loading', function() {
    return {
        template: '<p ng-show="isloading">Loading...</p>',
        scope: {
            isLoading: '='
        }
    };
});