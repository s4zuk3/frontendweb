EventosUsach.controller('eventController', function($scope, $rootScope,$mdDialog,$http) {
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
});