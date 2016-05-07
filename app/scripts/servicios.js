angular.module('angularSpa.services',[])
	.factory('actorCRUD',function($resource){
    return $resource('http://localhost:8080/sakila-backend-master/actors/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
	});

}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});