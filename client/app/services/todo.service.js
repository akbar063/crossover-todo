// All the external http requests i have done via promises as promises is the best way to get consistent data on consistent time
'use strict';

angular.module('todoApp')
	// some dependencies for promises, http, window object and Auth service to get session info
	.factory("ToDo", function ($http, $q, $window, auth) {
		var user;
		return{
			get: function(user) {
				// initialize the promise
				var deferred = $q.defer();
				if(auth.getUser()){
					$http({
						url: '/todos?sessionId=' + auth.getUser().sessionId,
						method: "GET",
						})
					.then(function(response) {
						// send resolved
						deferred.resolve(response.data);
					},function (error) {
						deferred.reject(error.data);
					})
				}else{
					deferred.reject(null);
				}
				
				return deferred.promise;
			},
			add: function (item) {
				var deferred = $q.defer();
				if(auth.getUser()){
					item.status = 'notCompleted';
					$http({
						url: '/todo?sessionId=' + auth.getUser().sessionId,
						method: "PUT",
						data:item
						})
					.then(function(response) {
						deferred.resolve(response.data);
					},function (error) {
						deferred.reject(error.data);
					})
				}else{
					deferred.reject(null);
				}
				
				return deferred.promise;
			},
			delete: function (id) {
				var deferred = $q.defer();
				if(auth.getUser()){
					$http({
						url: '/todo?sessionId=' + auth.getUser().sessionId,
						method: "delete",
						data:{
							"id":id
						},
						headers: {
							'Content-type': 'application/json;charset=utf-8'
						}
						})
					.then(function(response) {
						deferred.resolve(response.data);
					},function (error) {
						deferred.reject(error.data);
					})
				}else{
					deferred.reject(null);
				}
				
				return deferred.promise;
			},
			update: function (item) {
				var deferred = $q.defer();
				if(auth.getUser()){
					$http({
						url: '/todo?sessionId=' + auth.getUser().sessionId,
						method: "PUT",
						data:item
						})
					.then(function(response) {
						deferred.resolve(response.data);
					},function (error) {
						deferred.reject(error.data);
					})
				}else{
					deferred.reject(null);
				}
				
				return deferred.promise;
			},
			
        }
    })
