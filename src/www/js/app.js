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
        })
        
        .state('NewRecipe', {
            url: '/newRecipe',
            templateUrl: 'html/views/newRecipe.html',
            controller: 'newRecipeCtrl'
        })
        
        .state('UserAccount',{
            url: '/userAccount',
            templateUrl: 'html/views/userAccount.html',
            controller: 'userAccountCtrl'
        })
        
        .state('BrowseRecipes', {
            url: '/browse',
            templateUrl: 'html/views/browseRecipes.html',
            controller: 'browseRecipesCtrl'
        });
	
	$urlRouterProvider.otherwise('/login');
});