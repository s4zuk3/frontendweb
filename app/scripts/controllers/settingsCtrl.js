EventosUsach.controller('settingsController', function($scope,$http,$location,$templateCache,$window,$rootScope,$mdDialog, $mdMedia,$mdToast) {
	auth = $rootScope.auth;
	session = $rootScope.session;
	$scope.pref_user = [];
	$scope.usuario={};
	$scope.alert = function(t){$window.alert(t);}
	$scope.obtener = function(){
		$scope.usuario.correoUsuario=session.getUser().correoUsuario;
		$scope.usuario.contrasenhaUsuario=session.getUser().contrasenhaUsuario;
		$scope.usuario.nombreUsuario=session.getUser().nombreUsuario;
		$scope.usuario.apellidoUsuario=session.getUser().apellidoUsuario;
		$scope.usuario.carreraUsuario=session.getUser().carreraUsuario;
		$scope.usuario.administrador=session.getUser().administrador;
		$scope.usuario.idTipoEstado=session.getUser().idTipoEstado;
		$scope.usuario.idUsuario=session.getUser().idUsuario;

		$http.get('http://localhost:8080/EventoUsachJava/tipos').then(
			//success:
			function(response){
				$scope.tipos = response.data;
				var tipos = response.data;
				i=0;
				while(i<tipos.length)$scope.pref_user[i++]=false;

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
								$scope.preferenciasDelUsuario = [];
								i=0;
								j=0;
								while(i<$scope.preferencias.length){
										if($scope.preferencias[i].idUsuario == session.getUser().idUsuario ){
											$scope.preferenciasDelUsuario[j++]=$scope.preferencias[i].idPreferencia;
											$scope.pref_user[$scope.preferencias[i].idTipo-1]=true;
										}
										i++;
								}
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
							$mdToast.show($mdToast.simple().textContent('Usuario Deshabilitado.').hideDelay(1500).position('bottom left'));
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
					$mdToast.show($mdToast.simple().textContent('Usuario Deshabilitado.').hideDelay(1500).position('bottom left'));
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
					$mdToast.show($mdToast.simple().textContent('Usuario Habilitado.').hideDelay(1500).position('bottom left'));
					$scope.usuarios=null;
					$scope.obtenerAll();
				});
			}
		);
	}
	$scope.habilitado = function(idx){
		return $scope.usuarios[idx].idTipoEstado==1;
	}

	$scope.edit = function(prefs,usrData){
		// borro todas las preferencias anteriores del usuario, y luego inserto las nuevas
		i=0;
		while(i<$scope.preferenciasDelUsuario.length){
			$http.get('http://localhost:8080/EventoUsachJava/preferencias/eliminar/'+$scope.preferenciasDelUsuario[i++])
			.then(
				function(response){
					// todo ok?
				}
			);
		}
		// ahora inserto las nuevas
		i=0;
		while(i<$scope.pref_user.length){
			if($scope.pref_user[i++]==true){
				var data_newPref = {};
				data_newPref.idTipo=i;
				data_newPref.idUsuario=session.getUser().idUsuario;
				$http.post('http://localhost:8080/EventoUsachJava/preferencias',data_newPref)
				.success(
					function(response){
						// todo ok?
					}
				);				
			}
		}
		// finalmente actualizo los datos
		$http.put("http://localhost:8080/EventoUsachJava/usuarios/"+session.getUser().idUsuario, usrData)
		.success(function(data, status) {

		});
        session.setUser(usrData);
       	$mdDialog.cancel();
    	$location.path($location.path()+"/");
		$mdToast.show($mdToast.simple().textContent('Preferencias Actualizadas.').hideDelay(1500).position('bottom left'));
	}

	$scope.cancel = function() {
    	$mdDialog.cancel();
  	};

}); 
