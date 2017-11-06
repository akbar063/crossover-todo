'use strict'
// Main module
angular.module('todoApp')	
    
	 .controller("loginCTRL", function ($state, $scope,$timeout,$rootScope,auth, $mdToast) {
        // this will trigger on ng submit of login form.
        $scope.login = function (user,e){
            // get copy of login credentials (dont directly bind) 
            var userRef = angular.copy(user);
            // MD5 used a open sourced JS snippit. Message-Digest Algorithm
            userRef.password = MD5(userRef.password);

            $scope.screenLoader = true; // Showing loader and restrict user not to resubmit form while processing
            
            // login Handler using auth service
            auth.login(userRef).then(function (res) {
                // if credentials are correct
                if (res.status == 'success') {
                    // for testing
                    $scope.data=res;
                    // Notifications through Toasts
                    var toast = $mdToast.simple()
                        .textContent(`Welcome ${res.username}`)
                        .position('bottom right');
                    $mdToast.show(toast)
                    // redirect state
                    $state.go('todo');
                }else if(res.status == 'error'){
                    // if credentials are wrong // Notifications through Toasts
                    var toast = $mdToast.simple()
                        .textContent(res.error)
                        .position('bottom right');
                    $mdToast.show(toast)

                }
                // removing the screen loader
                $scope.screenLoader = false;
            },function(err){
                // if request dont successful
                console.log(err);
                var toast = $mdToast.simple()
                    .textContent('Server Error. Please try again later.')
                    .position('bottom right');

                $mdToast.show(toast)

                $scope.screenLoader = false;
            });
        }
    })




