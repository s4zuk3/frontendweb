EventosUsach.controller('registerController',function($scope,$rootScope,$mdDialog) {
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
});
