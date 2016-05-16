EventosUsach.controller('LogController', function($scope,$http,$templateCache) {
	var usuario = null;
	$scope.fetch = function(){
		$http({method: 'GET', url: 'http://localhost/frontendweb/app/scripts/eventosTest.json', cache: $templateCache}).
			then(function(response) {
			$scope.eventos = response.data;
			i=0;
			for(evento in $scope.eventos){
				$scope.eventos[evento].id=i++;
			}
		}, function(response) {
			$scope.eventos = response.data || "Request failed";
			i=0;
			for(evento in $scope.eventos){
				$scope.eventos[evento].id=i++;
			}
		});
	}
});