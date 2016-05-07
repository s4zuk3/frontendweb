angular.module('angularSpa.controllers',[])

.controller('ActorListController',function($scope,actorCRUD){

    $scope.actors=actorCRUD.query();

})

.controller('ActorCreateController',function($scope,actorCRUD){

    $scope.actor=new actorCRUD();

    $scope.addActor=function(){
        $scope.actor.lastUpdate = new Date();
        $scope.actor.$save();
    }

})