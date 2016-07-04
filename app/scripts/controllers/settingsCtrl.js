EventosUsach.controller('settingsController', function($scope,$http,$location,$templateCache,$window,$rootScope,$mdDialog, $mdMedia,$mdToast) {
	auth = $rootScope.auth;
	session = $rootScope.session;
	$scope.alert = function(t){$window.alert(t);}
	$scope.getCheck = function(t){
		while(i<$scope.preferencias.length){
			if($scope.preferencias[i++].idTipo == t ){
				return true;
			}
		}
		return false;
	};
	$scope.obtener = function(){
		$http.get('http://localhost:8080/EventoUsachJava/tipos').then(
			//success:
			function(response){
				$scope.tipos = response.data;
				var tipos = response.data;
				$http.get('http://localhost:8080/EventoUsachJava/usuarios/'+session.getUser().idUsuario).then(
					//success:
					function(response){
						/*********** ACA HAY Q ARREGLAR *************/
						$scope.datosusuario = response.data;
						var lugares = response.data;
						$http.get('http://localhost:8080/EventoUsachJava/preferencias').then(
							//success:
							function(response){
								$scope.preferencias = response.data;
								var pref_user = [];
								i=0;
								while(i<$scope.preferencias.length){
										if($scope.preferencias[i].idUsuario == session.getUser().idUsuario ){
											pref_user.push($scope.preferencias[i]);
										}
										i++;
								}
								$scope.preferencias = pref_user;
							},
							//failure:
							function(response){
								$scope.obtener();
							}
						);
					},
					//failure
					function(response){
						$scope.obtener();
					}
				);
			},
			//failure:
			function(response){
				$scope.obtener();
			}
		);
	}

	$scope.obtenerAll = function(){
		$http.get('http://localhost:8080/EventoUsachJava/usuarios').then(
			//success:
			function(response){
				$scope.usuarios = response.data;
			},
			//failure:
			function(response){
				$scope.obtenerAll();
			}
		);
	}

	$scope.deshabilitar = function(){
		var id_user = $rootScope.session.getUser().idUsuario;
		var flag = 2; // flag para desabilitar
		var url_edit = "http://localhost:8080/EventoUsachJava/usuarios/"+id_user;
				  
		$http.get(url_edit).then(
					//success:
					function(response){
						var user = response.data;
						var edit_user = {};
						edit_user.administrador = user.administrador;
						edit_user.apellidoUsuario = user.apellidoUsuario;
						edit_user.carreraUsuario = user.carreraUsuario;
						edit_user.contrasenhaUsuario = user.contrasenhaUsuario;
						edit_user.correoUsuario = user.correoUsuario;
						edit_user.idUsuario = user.idUsuario;
						edit_user.nombreUsuario = user.nombreUsuario;
						edit_user.idTipoEstado = flag;
						//alert(JSON.stringify(edit_user));
						  $http.put(url_edit, edit_user)
				          .success(function(data, status) {
				          	clearMap();
							$rootScope.session.destroy();
							$location.path('/');
							$scope.currentLocation = $location.path();
							$mdToast.show($mdToast.simple().textContent('Sesión cerrada').hideDelay(2000).position('bottom left'));
							$mdDialog.cancel();
				           });
					}
				);
	}
	$scope.deshabilitar = function(id_user){
		var flag = 2; // flag para desabilitar
		var url_edit = "http://localhost:8080/EventoUsachJava/usuarios/"+id_user;
				  
		$http.get(url_edit).then(
			//success:
			function(response){
				var user = response.data;
				var edit_user = {};
				edit_user.administrador = user.administrador;
				edit_user.apellidoUsuario = user.apellidoUsuario;
				edit_user.carreraUsuario = user.carreraUsuario;
				edit_user.contrasenhaUsuario = user.contrasenhaUsuario;
				edit_user.correoUsuario = user.correoUsuario;
				edit_user.idUsuario = user.idUsuario;
				edit_user.nombreUsuario = user.nombreUsuario;
				edit_user.idTipoEstado = flag;
				//alert(JSON.stringify(edit_user));
				$http.put(url_edit, edit_user)
				.success(function(data, status) {
					$mdToast.show($mdToast.simple().textContent('Usuario Deshabilitado').hideDelay(1000).position('bottom left'));
					$scope.usuarios=null;
					$scope.obtenerAll();
				});
			}
		);
	}
	$scope.habilitar = function(id_user){
		var flag = 1; // flag para desabilitar
		var url_edit = "http://localhost:8080/EventoUsachJava/usuarios/"+id_user;
				  
		$http.get(url_edit).then(
			//success:
			function(response){
				var user = response.data;
				var edit_user = {};
				edit_user.administrador = user.administrador;
				edit_user.apellidoUsuario = user.apellidoUsuario;
				edit_user.carreraUsuario = user.carreraUsuario;
				edit_user.contrasenhaUsuario = user.contrasenhaUsuario;
				edit_user.correoUsuario = user.correoUsuario;
				edit_user.idUsuario = user.idUsuario;
				edit_user.nombreUsuario = user.nombreUsuario;
				edit_user.idTipoEstado = flag;
				$http.put(url_edit, edit_user)
				.success(function(data, status) {
					$mdToast.show($mdToast.simple().textContent('Usuario Habilitado').hideDelay(1000).position('bottom left'));
					$scope.usuarios=null;
					$scope.obtenerAll();
				});
			}
		);
	}
	$scope.habilitado = function(idx){
		return $scope.usuarios[idx].idTipoEstado==1;
	}

	$scope.edit = function(data){

	}

}); 
