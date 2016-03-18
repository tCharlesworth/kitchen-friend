angular.module('kitchenFriend')
    .directive('userPreview', function() {
        return {
            templateUrl: 'html/templates/userPreview.html',
            scope: {
                user: "="
            },
            controller: function($scope) {
                $scope.defaultPic = "https://pixabay.com/static/uploads/photo/2013/07/13/12/07/avatar-159236_960_720.png";
            }
        };
    });