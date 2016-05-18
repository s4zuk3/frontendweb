var EventosUsach = angular.module('EventosUsach', ["ngRoute","ngMessages","ngMaterial"]);
EventosUsach.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/', {
		resolve: {
			"check": function($location,$rootScope){
				if( $rootScope.auth.isLoggedIn()){
					$location.path('/user');
				}
			}	
		},
		 templateUrl: 'views/guestHome.html',
		 controller: 'GuestController'
	}).
	when('/user', {
		resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.auth.isLoggedIn()){
					$location.path('/');
				}
			}	
		},
		templateUrl: 'views/userHome.html',
		controller: 'UserController'
	}).
	when('/admin', {
		resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.auth.isLoggedIn()){ // Si no esta logeado goHome
					$location.path('/');
				}
				else // si esta logeado ver si es admin
				{
					if(!$rootScope.auth.isAdmin()){
						$location.path('/user');
					} 
				}
			}	
		},
		templateUrl: 'views/adminHome.html',
		controller: 'AdminController'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);

/** esta directiva arregla un bug de los input tipo password en chrom **/
EventosUsach.directive('mdInputContainer', function ($timeout) {
    return function ($scope, element) {
        var ua = navigator.userAgent;
        if (ua.match(/chrome/i) && !ua.match(/edge/i)) {
            $timeout(function () {
                if (element[0].querySelector('input[type=password]:-webkit-autofill')) {
                    element.addClass('md-input-has-value');
                }
            }, 100);
        }
    };
});