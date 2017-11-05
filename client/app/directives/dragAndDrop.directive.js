angular.module('todoApp')
    .directive('droppable', function($timeout, ToDo, $mdToast) {
        return {
        link: function(scope, element,attr) {
            element[0].addEventListener('drop', function(ele) {
                // geting data in html5 drag and drop way.
                var key = ele.dataTransfer.getData('key');
                // parsing it from string to valid json
                var value = JSON.parse(ele.dataTransfer.getData('item'));
                // using timeout so that we can be with angular watchers :)
                $timeout(function(){
                    // splicing from previous bucket and adding in new one on front end
                    if(value.status == 'notCompleted'){
                        scope.tasks.notCompleted.splice(key, 1);
                        value.status = 'completed'
                        scope.tasks.completed.push(value);
                    }else if(value.status == 'completed'){
                        scope.tasks.completed.splice(key, 1);
                        value.status = 'notCompleted'
                        scope.tasks.notCompleted.push(value);
                    }
                    // preparing modal for API
                    var itemModal = {
                        id : value._id,
                        status: value.status
                    }
                    // to Change the status through the ToDo service
                    ToDo.update(itemModal).then(function(res){
                        var toast = $mdToast.simple()
                            .textContent("Item Updated Successfully")
                            .position('bottom left');
        
                        $mdToast.show(toast)
                    },function(err){
                        console.log(err);
                    });
                })
                
                // scope.$apply();
                return false;
            }, false);
            element[0].addEventListener('dragover', function(ele) {
                // adding drop effect
                ele.dataTransfer.dropEffect = 'move';
                // prevent default so that we can drag elements
                if (ele.preventDefault){
                    ele.preventDefault();
                }
                return false;
            }, false);
        }
    }
})
    .directive('draggable', function() {
        return {
        link: function(scope, element, attr) {
            // making sure draggable is true
            element[0].draggable = true;
            var item;
            // registering event
            element[0].addEventListener('dragstart', function(ele) {
                // parsing attr
                item = JSON.parse(attr.data);
                if(item.status == 'completed'){
                    // some basic style when drag start
                    this.style.opacity = '0.7';
                    this.style.transform='rotate(-2deg)';
                    angular.element(document.getElementById('leftdroper'))[0].style.display='block';
                    // showing user where to drop
                    var objDiv = document.getElementById("leftTaskWrapper");
                    objDiv.scrollTop = objDiv.scrollHeight;
                }else{
                    // some basic style when drag start
                    this.style.opacity = '0.7';
                    this.style.transform='rotate(2deg)';
                    angular.element(document.getElementById('rightdroper'))[0].style.display='block';

                    // showing user where to drop
                    var objDiv = document.getElementById("rightTaskWrapper");
                    objDiv.scrollTop = objDiv.scrollHeight;
                }
                //setting data in html Dnd way
                ele.dataTransfer.setData('item', JSON.stringify(item));
                ele.dataTransfer.setData('key', attr.index);
                return false;
            }, false);
            

            element[0].addEventListener('dragend', function(ele) {
                if(item.status == 'completed'){
                    // undo styling
                    this.style.opacity = '1';
                    this.style.transform='rotate(0deg)';
                    angular.element(document.getElementById('leftdroper'))[0].style.display='none';
                }else{
                    this.style.opacity = '1';
                    this.style.transform='rotate(0deg)';
                    angular.element(document.getElementById('rightdroper'))[0].style.display='none';
                }
                return false;
            }, false);

           
        }
    }
    });
    
