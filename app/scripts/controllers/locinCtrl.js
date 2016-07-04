EventosUsach.controller('loginController',function($scope, $rootScope,$mdDialog,$mdToast) {
  $scope.credentials = {};
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer,credentials){
  	if( !angular.isUndefined($scope.credentials.user) && !angular.isUndefined($scope.credentials.password) )
  		$rootScope.auth.logIn($scope.credentials,answer,$mdDialog,$mdToast);
  	else{
  		$scope.credentials.error = true;
  	}
  };
});
