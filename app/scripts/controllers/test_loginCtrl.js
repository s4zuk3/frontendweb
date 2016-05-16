EventosUsach.controller('test',function($scope,$http){
	$http.get('http://localhost:9000/db.json')
	.success(function(response){
		$scope.usuarios = response.login;
	});
});