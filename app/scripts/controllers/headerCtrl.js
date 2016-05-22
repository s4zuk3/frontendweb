EventosUsach.controller('headerController',function($rootScope, $scope, $mdDialog, $mdMedia,$location,$window){
	$scope.status = '  ';
	$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
	$scope.showRegister = function(ev) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		$mdDialog.show({
			controller: registerController,
			templateUrl: 'views/register.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		})
		.then(function() {
		}, function() {
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
			controller: loginCtrl,
			templateUrl: 'views/login.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		})
		.then(function() {
		}, function() {
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
			controller: eventCtrl,
			templateUrl: 'views/newEvent.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: useFullScreen
		})
		.then(function() {
		}, function() {
		});
		$scope.$watch(function() {
			return $mdMedia('xs') || $mdMedia('sm');
		}, function(wantsFullScreen) {
			$scope.customFullscreen = (wantsFullScreen === true);
		});
	};
	$scope.logout = function(){
		$rootScope.session.destroy();
		$location.path('/');
	};
	$scope.Administrar = function(){
		$location.path('/admin');
	};
})

function registerController($scope,$rootScope,$mdDialog) {
  $scope.newuser = {};
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer,newuser) { //validaciones del form, nose hacerlo otra forma xD
  	$scope.newuser.error = false;
  	$scope.newuser.email_error = false;
  	$scope.newuser.notmatch = false;
  	$scope.newuser.email_usado = false;
  	if ( angular.isUndefined($scope.newuser.nombre) ) {
		$scope.newuser.error = true;
		return;
  	}
  	if ( angular.isUndefined($scope.newuser.apellido) ) {
		$scope.newuser.error = true;
		return;
  	}
  	if ( angular.isUndefined($scope.newuser.carrera) ) {
		$scope.newuser.error = true;
  		return;
  	}
  	if ( angular.isUndefined($scope.newuser.correo) ) {
		$scope.newuser.email_error = true;
		return;
  	}
  	if ( angular.isUndefined($scope.newuser.password) ) {
		$scope.newuser.error = true;
		return;
  	}
  	if ( angular.isUndefined($scope.newuser.repassword) ) {
		$scope.newuser.error = true;
		return;
  	}
  	if( $scope.newuser.password !== $scope.newuser.repassword  ){
  		$scope.newuser.notmatch = true;
  		return;
  	}
  	$rootScope.auth.register($scope.newuser,answer,$mdDialog);
  	
    
  };
}
function loginCtrl($scope, $rootScope,$mdDialog) {
  $scope.credentials = {};
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer,credentials){
  	if( !angular.isUndefined($scope.credentials.user) && !angular.isUndefined($scope.credentials.password) )
  		$rootScope.auth.logIn($scope.credentials,answer,$mdDialog);
  	else{
  		$scope.credentials.error = true;
  	}
  };
}

function eventCtrl($scope, $rootScope,$mdDialog,$http) {
	$scope.tipos = [];
	$scope.lugares = [];
	$scope.loadTipo = function(){
		$http
      	.get('http://localhost:8080/EventoUsachJava/tipos')
      	.then(function(response){
			var data = response.data;
			var i=0;
			for(tipo in data){
				$scope.tipos.push(data[i].tipoEvento.replace("Ã³","ó"));
				i++;
			}
		});
	}
	$scope.loadLugar = function(){
		$http
		.get('http://localhost:8080/EventoUsachJava/lugares')
		.then(function(response){
			var data = response.data;
			var i=0;
			for(lugar in data){
				$scope.lugares.push(data[i].nombreLugar);
				i++;
			}
		});
	}
	$scope.myDate = new Date();
	$scope.minDate = new Date();
	$scope.maxDate = new Date(
		$scope.myDate.getFullYear(),
		$scope.myDate.getMonth()+1,
		$scope.myDate.getDate()
		);
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer,credentials){
		if( !angular.isUndefined($scope.credentials.user) && !angular.isUndefined($scope.credentials.password) ){
			$rootScope.auth.logIn($scope.credentials,answer,$mdDialog);
		}else{
			$scope.credentials.error = true;
		}
	};
}