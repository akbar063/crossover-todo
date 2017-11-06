describe('Checking Login Controller', function() {
    var $controller;
    // Before each test load our api.users module
    beforeEach(angular.mock.module('todoApp'));

    // Before each test set our injected Users factory (_auth_) to our local Users variable
    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));


    describe('checking login controller', function () {
		it('Existence of login function',  inject(function (auth) {
			var $scope = {};
			var controller = $controller('loginCTRL', { $scope: $scope });
			expect($scope.login).toBeDefined();
		}));	
	});
    
  
})