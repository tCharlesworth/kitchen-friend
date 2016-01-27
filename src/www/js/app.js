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
        })
        
        .state('Recipe', {
            url: '/recipe/:recipeId',
            templateUrl: 'html/views/recipe.html',
            controller: 'recipeCtrl'
        })
        
        .state('RecipeEdit', {
            url: '/editRecipe/:recipeId',
            templateUrl: 'html/views/recipeEdit.html',
            controller: 'recipeEditCtrl'
        })
        
        .state('RecipeShare', {
            url: '/shareRecipe/:recipeId',
            templateUrl: 'html/views/recipeShare.html',
            controller: 'recipeShareCtrl'
        })
        
        .state('RecipePublic', {
            url: '/publicRecipe/:recipeId',
            templateUrl: 'html/views/recipePublic.html',
            controller: 'recipePublicCtrl'
        });
	
	$urlRouterProvider.otherwise('/login');
});