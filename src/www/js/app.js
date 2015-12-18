angular.module('kitchenFriend', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
		.state('Login', {
			url: '/login',
			templateUrl: 'html/views/login.html',
			controller: 'loginCtrl'
		});
	
	$urlRouterProvider.otherwise('login');
});