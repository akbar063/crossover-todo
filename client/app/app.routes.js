'use strict'

angular.module('todoApp')	
	.config(function($stateProvider, $urlRouterProvider, $locationProvider, $provide){
		var pDir = "./app/views/";
		$stateProvider
			.state('login', {
				url: '/',
				controller:"loginCTRL",
				templateUrl: pDir+"login.html",
				
			})
			// creating a route for logout to accessable anywhere in app
			.state('logout', {
				url: '/logout', 
				// logout Logic here. 
				resolve:{
					logout:function ($state,auth,$mdToast) {
						auth.logout().then(function(res){
							if(res.status == 'success'){
								var toast = $mdToast.simple()
									.textContent('You are logged out.')
									.position('bottom right');
								$mdToast.show(toast)
								$state.go('login');
							}else{
								var toast = $mdToast.simple()
									.textContent('Some Error happened. Please login Again.')
									.position('bottom right');
								$mdToast.show(toast)
								$state.go('login');
							}
						},function(err){
							console.log(err);
							var toast = $mdToast.simple()
								.textContent('Please Login.')
								.position('bottom right');
							$mdToast.show(toast)
							$state.go('login');
						});
					}
				}
			})
			// TODO route after validating the user
			.state('todo', {
				url: '/todo', 
				controller:"todoCTRL",
				templateUrl: pDir+"todo.html",
				resolve:{
					user:function (auth, $state, $mdToast) {
						if(!auth.getUser()) {
							var toast = $mdToast.simple()
								.textContent('Please Login to continue.')
								.position('bottom right');
							$mdToast.show(toast)
							$state.go('login');
						}else{
							return auth.getUser();
						}
						
					}
				}
			}),
			
		// redirecting all other unknown routes
		$urlRouterProvider.otherwise('/todo');
		// HTML5 enabling for pretty URL
		$locationProvider.html5Mode(true);


	})




