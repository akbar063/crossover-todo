describe('Checking auth factory', function() {
    var auth;
  
    // Before each test load our api.users module
    beforeEach(angular.mock.module('todoApp'));
  
    // Before each test set our injected Users factory (_auth_) to our local Users variable
    beforeEach(inject(function(_auth_) {
      auth = _auth_;
    }));
  
    // A simple test to verify the auth factory exists
    it('should exist', function() {
        expect(auth).toBeDefined();
    });
    // A simple test to verify the auth.login exists
    it('should auth.login()', function() {
        expect(auth.login()).toBeDefined();
    });
    // A simple test to verify the auth.getUSer exists
    it('should auth.getUser()', function() {
        expect(auth.getUser()).toBeDefined();
    });
    // A simple test to verify the auth.logout exists
    it('should auth.logout()', function() {
        expect(auth.logout()).toBeDefined();
    });

    // checking MD5 function
    it('Checing MD5 function', function() {
        expect(MD5('password')).toEqual("5f4dcc3b5aa765d61d8327deb882cf99");
    });
    // Checking login and logout
    it('Should successfull login and logout', function() {
        auth.login({'username': 'ali', 'password': MD5('password')}).then(function(res){
            expect(res.usernmae).toEqual('alii');
            // auth.logout().then(function(res){
            //     // expect(res.status).toEqual('success');
            // })
        })
    });


  });