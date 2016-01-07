angular.module('kitchenFriend', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
		.state('Login', {
			url: '/login',
			templateUrl: 'html/views/login.html',
			controller: 'loginCtrl'
		})
        
        .state('Home', {
            url: '/home',
            templateUrl: 'html/views/userHome.html',
            controller: 'userHomeCtrl'
        })
        
        .state('Recipes', {
           url: '/recipes',
           templateUrl: 'html/views/userRecipes.html',
           controller: 'userRecipesCtrl' 
        });
	
	$urlRouterProvider.otherwise('/login');
});