EventosUsach.controller('headerController',function($rootScope, $scope, $mdDialog, $mdMedia,$location,$window, $mdToast){
	$scope.admin=false;
	$scope.logged=false;
	$scope.currentLocation = $location.path();
	$scope.status = '  ';
	$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
	$scope.showRegister = function(ev) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		$mdDialog.show({
			templateUrl: 'views/register.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		});
		$scope.$watch(function() {
			return $mdMedia('xs') || $mdMedia('sm');
		}, function(wantsFullScreen) {
			$scope.customFullscreen = (wantsFullScreen === true);
		});
	};
	$scope.showLogin = function(ev) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		$mdDialog.show({
			templateUrl: 'views/login.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		});
		$scope.$watch(function() {
			return $mdMedia('xs') || $mdMedia('sm');
		}, function(wantsFullScreen) {
			$scope.customFullscreen = (wantsFullScreen === true);
		});
	};
	$scope.nuevo = function(ev) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		$mdDialog.show({
			templateUrl: 'views/newEvent.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		});
		$scope.$watch(function() {
			return $mdMedia('xs') || $mdMedia('sm');
		}, function(wantsFullScreen) {
			$scope.customFullscreen = (wantsFullScreen === true);
		});
	};
	$scope.logout = function(){
		clearMap();
		$rootScope.session.destroy();
		$location.path('/');
		$scope.currentLocation = $location.path();
		$mdToast.show($mdToast.simple().textContent('Sesión cerrada').hideDelay(2000).position('bottom left'));
	};
	$scope.administrar = function(){
		clearMap();
		$scope.admin=true;
		$location.path('admin');
		$scope.currentLocation = $location.path();
	};
	$scope.verComoUsuario = function(){
		clearMap();
		$scope.admin=false;
		$location.path('/');
		$scope.currentLocation = $location.path();
	}
	$scope.gestEventos = function(){
		clearMap();
		$location.path("admin/eventos");
		$scope.admin=true;
		$scope.currentLocation = $location.path();
		// esta url debe cargar la vista "gestionarEventos.html"
	}
	$scope.gestUsuarios = function(){
		clearMap();
		$location.path("admin/usuarios");
		$scope.admin=true;
		$scope.currentLocation = $location.path();
		// esta vista va para el sprint 3
	}
	$scope.suscripciones = function(){
		$location.path("user/eventos");
		// esta url debe cargar la vista "eventosUsuario.html"
	}
	$scope.checkLoc = function(){
		if($location.path()=="/admin/eventos" || $location.path()=="/admin/usuarios"){
			$scope.admin=true;
			$scope.currentLocation = $location.path();			
		}
	}
	$scope.settings = function(ev){
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		$mdDialog.show({
			templateUrl: 'views/settings.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		});
		$scope.$watch(function() {
			return $mdMedia('xs') || $mdMedia('sm');
		}, function(wantsFullScreen) {
			$scope.customFullscreen = (wantsFullScreen === true);
		});
	}
});

