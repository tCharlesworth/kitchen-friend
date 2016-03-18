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
        })
        
        .state('Group', {
            url: '/group',
            templateUrl: 'html/views/group.html',
            controller: function($state, $scope, groupService, authService) {
                var user;
                if($state.current.url === '/group') {
                    $state.go('Group.Dashboard');
                }
                
                $scope.currentTab = $state.current.url;
                console.log('CURRENT TAB: ', $scope.currentTab);
                
                authService.getAuth().then(function(response) {
                    user = response.data;
                    console.log('user loaded');
                });
                groupService.getMyGroups().then(function(response) {
                    $scope.groups = response.groups;
                });
                
                $scope.checkAdmin = function(group) {
                    if(!user) {
                        return false;
                    }
                    for(var i = 0; i < group.administrators.length; i++) {
                        if(group.administrators[i] === user._id) {
                            return true;
                        }
                    }
                    return false;
                };
            }
        })
        
            .state('Group.Dashboard', {
                url: '/dashboard',
                templateUrl: 'html/views/groupDashboard.html',
                controller: 'groupDashboardCtrl'
            })
            
            .state('Group.Create', {
                url: '/create/:groupId',
                templateUrl: 'html/views/groupCreate.html',
                controller: 'groupCreateCtrl'
            })
        
            .state('Group.Admin', {
                url: '/admin/:groupId',
                templateUrl: 'html/views/groupAdmin.html',
                controller: 'groupAdminCtrl'
            })
            
            .state('Group.Recipes', {
                url: '/recipes/:groupId',
                templateUrl: 'html/views/groupRecipes.html',
                controller: 'groupRecipesCtrl'
            })
            
            .state('Group.Members', {
                url: '/members/:groupId',
                templateUrl: 'html/views/groupMembers.html',
                controller: 'groupMemberCtrl'
            })
            
            .state('Group.Home', {
                url: '/home/:groupId',
                templateUrl: 'html/views/groupHome.html',
                controller: 'groupHomeCtrl'
            })
            
            .state('Group.RecipeView', {
                url: '/recipe/:recipeId',
                templateUrl: 'html/views/groupRecipeView.html',
                controller: 'groupRecipeViewCtrl'
            })
        
        .state('MobileSuccess', {
            url: '/mobile/success',
            templateUrl: 'html/views/mobile/loginFailure.html'
        })
        
        .state('MobileFailure', {
            url: '/mobile/failure',
            templateUrl: 'html/views/mobile/loginSuccess.html'
        });
	
	$urlRouterProvider.otherwise('/login');
});