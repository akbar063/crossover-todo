'use strict'

angular.module('todoApp')	
	 .controller("todoCTRL", function ($state, $scope,$timeout,$rootScope, user, $mdToast, ToDo, $sce,$mdDialog) {
        $scope.user = user;
        // For device validation and design purposes. to show the both buckets full heights.
        var mobileDevice = window.matchMedia( "(max-width: 767px)" );
        if(mobileDevice){
            $rootScope.allowFullHeight = true;
        }
        
        // modal for buckets
        $scope.tasks = {
            notCompleted : [],
            completed : [],
            isLoaded : false
        }
        // setting up a trigger for showing inline editor
        $scope.addNew = false;
        // getting all todos through ToDo service "services/todo.service.js"
        ToDo.get().then(function(res){
            if (res.status == 'success') {
                // setting up the model for data to create logic
                angular.forEach(res.data, function(value, key) {
                    if (value.status == 'completed') {
                        $scope.tasks.completed.push(value);
                    }else if(value.status == 'notCompleted'){
                        $scope.tasks.notCompleted.push(value);
                    }
                })
                // a utility to use if we need a loading 
                $scope.tasks.isLoaded = true;
            }else{
                var toast = $mdToast.simple()
                    .textContent(res.error + ', Please login.')
                    .position('bottom right');

                $mdToast.show(toast)
                // redirecting to logout if API repond some error
                $state.go('logout');
            }

        }, function(err){
            console.log(err);
            // redirecting if some connection or other error
            if(err.status == 'error'){
                var toast = $mdToast.simple()
                    .textContent(err.error + ', Please login.')
                    .position('bottom right');

                $mdToast.show(toast)
                $state.go('logout');
            }
        });

        // Utillity for shoing inline editor for adding new Items
        $scope.addNewItem = function () {
            $scope.addNew = true;
        }
        // in case of if user dont want to add new item and hide the inline editor
        $scope.cancelAddNew = function () {
            $scope.addNew = false;
        }

        // saving new item 
        $scope.saveNewItem = function (item) {
            // using method of todo service to add item through the api to MongoDb
            ToDo.add(item).then(function (res) {
                // hide the editor
                $scope.cancelAddNew();
                // setting up model
                item._id = res.data._id;
                // API gives only author id not the username, so trying to keep model same as previous
                item.author={
                    username: $scope.user.username,
                    id : res.data.author
                }
                // also pushing the data to APP, it will save an extra call to backend for new updated data.
                $scope.tasks.notCompleted.push(item);
            },function (err) {
                console.log(err);
            });
        }
        $scope.confirmDelete = function(ev,id){
            // pop up the dialog to confirm the deletion. using material design of angular (angular material for angularJs)
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete this Item?')
                .textContent('Your this action will delete this item permanently.')
                .ariaLabel('Delete Item')
                .targetEvent(ev)
                .ok('Delete It!')
                .cancel('Cancel');
            // Trigging up
            $mdDialog.show(confirm).then(function() {
                // calling delete handler
                $scope.deleteItem(id);
            }, function() {
                // cacncel delete

            });
        }
        //delete handler
        $scope.deleteItem = function(id){
            // Service
            ToDo.delete(id).then(function (res) {
                if(res.status == 'success'){
                    if(res.data.status == 'notCompleted'){
                        // getindex is a global function of this scope to get index with multiple array through id
                        var index = getIndex($scope.tasks.notCompleted, id);
                        $scope.tasks.notCompleted.splice(index, 1);
                    }else if(res.data.status == 'completed'){
                        var index = getIndex($scope.tasks.completed, id);
                        $scope.tasks.completed.splice(index, 1);
                    }
                    var toast = $mdToast.simple()
                        .textContent("Item Deleted Successfully")
                        .position('bottom left');
    
                    $mdToast.show(toast)
                }else{
                    var toast = $mdToast.simple()
                        .textContent("Item Delete Failed. "+res.data)
                        .position('bottom left');

                    $mdToast.show(toast)
                }
                
            },function(err){
                console.log(err);
            });
        }
        // inline editor for addingnew records
        $scope.showInlineEditor = function (key, item) {
            var itemCopy = angular.copy(item);
            if(item.status == 'notCompleted'){
                // using attribute technique here. :)
                $scope.tasks.notCompleted[key].enableEdition = true;
                $scope.updateItem = itemCopy;
            }else if(item.status == 'completed'){
                // Angular is awesome for that. love to play with objects
                $scope.tasks.completed[key].enableEdition = true;
                $scope.updateItem = itemCopy;
            }
            
        }
        $scope.cancelInlineEditor=function (key, item) {
            if(item.status == 'notCompleted'){
                // cancelling inline editor
                $scope.tasks.notCompleted[key].enableEdition = false;
                $scope.updateItem = $scope.itemCopy;
            }else if(item.status == 'completed'){
                $scope.tasks.completed[key].enableEdition = false;
                $scope.updateItem = $scope.itemCopy;
            }
        }

        $scope.updateItemFunc=function (item,key) {
            // model for updating records
            var itemModal = {
                id : item._id,
                title:item.title,
                description: item.description,
                status: item.status
            }
            if(item.author.username != $scope.user.username){
                // restricting if user try to update some other records
                var toast = $mdToast.simple()
                    .textContent("You are not allowed to edit this Item.")
                    .position('bottom left');

                $mdToast.show(toast);
                
                $scope.cancelInlineEditor(key, item);
                return false;
            }
            // update method
            ToDo.update(itemModal).then(function(res){
                var autherId = res.data.author;
                res.data.author = {
                    username: $scope.user.username,
                    _id : autherId
                }
                $scope.tasks[item.status][key] = res.data;

                var toast = $mdToast.simple()
                    .textContent("Item Updated Successfully")
                    .position('bottom left');

                $mdToast.show(toast)

            },function(err){
                console.log(err);
            });
        }
        
        // for safe html to show in angular app
        $scope.renderHtml = function(html){
            return $sce.trustAsHtml(html);
        };

        function getIndex(array, id){
            for(var i = 0; i<array.length;i++){
                if(array[i]._id == id){
                    return i;
                }
            }
        }
       
    })




