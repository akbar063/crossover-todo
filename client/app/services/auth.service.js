
'use strict';

angular.module('todoApp')
	.factory("auth", function ($http, $q, $window) {
		// declaring the user var to share this data
		var user;
		return{
			login: function(user) {
				// initializing promise
				var deferred = $q.defer();
				$http({
			        url: '/user/auth',
                    method: "POST",
                    data : user,
				    })
				.then(function(response) {
					if(response.data.status == 'success'){
						// setting user model
						user = {
							username: response.data.username,
							sessionId: response.data.sessionId
						}
						// using lcoalStorage for stor session and use info
						$window.localStorage.setItem("user",angular.toJson(user));
					}
					deferred.resolve(response.data);
			    },function (error) {
			    	deferred.reject(error);
			    })
				
				return deferred.promise;
			},
			getUser: function(){
				// getting user, if not exists then get it from localstorage if not then null
				if(user) {
					return user;
				}else{
					user = angular.fromJson($window.localStorage.getItem("user"));
					if (!user) return null;
					return user;
				}
				
			},
			logout: function () {
				// logout method
				var deferred = $q.defer();
				if(!user){
					// if there is not user then
					deferred.reject(false);
				}else{
					$http({
						url: 'user/logout?sessionId=' + user.sessionId,
						method: "GET",
						})
					.then(function(response) {
						// removing lcoal storage and local user var to stop sharing user in the app
						$window.localStorage.removeItem("user");
						user = null;
						deferred.resolve(response.data);
					},function (error) {
						deferred.reject(error);
					})
				}
				
				// delivring promise
				return deferred.promise;
			}
        }
    })
