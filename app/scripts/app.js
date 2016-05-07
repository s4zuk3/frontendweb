angular.module('angularSpa', ['angularSpa.services','angularSpa.controllers','ngRoute','ngResource',])
    .config(angularSpaRouter);


function angularSpaRouter($routeProvider){
        $routeProvider
        .when('/listar', {
            templateUrl: 'views/listar.html',
            controller: 'ActorListController'
          })

        .when('/newActor', {
            templateUrl: 'views/newActor.html',
            controller: 'ActorCreateController'
          })
        .otherwise({
            redirectTo: '/home'
          });
}

