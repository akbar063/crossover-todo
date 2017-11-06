describe('Checking Todo Factory', function() {
    var ToDo;
    var $scope = {};

    // Before each test load our api.users module
    beforeEach(angular.mock.module('todoApp'));

    // Before each test set our injected Users factory (_auth_) to our local Users variable
    beforeEach(inject(function(_ToDo_) {
        ToDo = _ToDo_;
    }));

    // A simple test to verify the ToDo factory exists
    it('should exist', function() {
        expect(ToDo).toBeDefined();
    });
    // A simple test to verify the ToDo.get() exists
    it('should auth.login()', function() {
        expect(ToDo.get()).toBeDefined();
    });
    // A simple test to verify the auth.getUSer exists
    it('should auth.getUser()', function() {
        expect(ToDo.add()).toBeDefined();
    });
    // A simple test to verify the ToDo.add() exists
    it('should auth.logout()', function() {
        expect(ToDo.delete()).toBeDefined();
    });
    // A simple test to verify the ToDo.update() exists
    it('should auth.logout()', function() {
        expect(ToDo.update()).toBeDefined();
    });

    it('should check validation', inject(function($httpBackend,$http,auth) {

        auth.login({'username': 'ali', 'password': MD5('password')}).then(function(res){
            $scope.user = res;
            // this code needs to check
            $httpBackend
                .when('GET', '/todos?sessionId='+$scope.user.sessionId)
                .respond(200,{ 
                    status: 'error'
                });
            $httpBackend.flush();
            expect(response).toBeDefined();
        })
        


    }))
    
  
})