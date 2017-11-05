'use strict'

angular.module('todoApp', [
	'ui.router',
	'ui.bootstrap',
	'ngAnimate',
	'ngAria',
	'ngMaterial',
])	
// ====================== RUN ============================

// to use this root variables in app
.run(function ($interval,$rootScope,$state,$stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;	

})




