EventosUsach.controller('headerController',function($rootScope, $scope, $mdDialog, $mdMedia,$location){
	$scope.status = '  ';
	$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
	$scope.showRegister = function(ev) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		$mdDialog.show({
			controller: DialogController,
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
	$scope.logout = function(){
		$rootScope.session.destroy();
		$location.path('/');
	};
	$scope.Administrar = function(){
		$location.path('/admin');
	};
})

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
function loginCtrl($scope, $location, $rootScope,$mdDialog) {
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