EventosUsach.controller('settingsController', function($scope,$http,$location,$templateCache,$window,$rootScope,$mdDialog, $mdMedia) {
	auth = $rootScope.auth;
	session = $rootScope.session;
	$scope.editevent = {}
	hoy = new Date();
	$scope.alert = function(t){$window.alert(t);}
	$scope.getCheck = function(t){
		while(i<$scope.preferencias.length){
				if($scope.preferencias[i].idTipo == t ){
											return true;
					}
				i++;
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
		$http.get('http://localhost:8080/EventoUsachJava/tipos').then(
			//success:
			function(response){
				$scope.tipos = response.data;
				var tipos = response.data;
				$http.get('http://localhost:8080/EventoUsachJava/lugares').then(
					//success:
					function(response){
						$scope.lugares = response.data;
						var lugares = response.data;
						$http.get('http://localhost:8080/EventoUsachJava/eventos').then(
							//success:
							function(response){
								$scope.eventos = response.data;
								var eventos = $scope.eventos;
								i=0;
								for(evento in eventos){
									$scope.eventos[i].foto = tipos[eventos[i].idTipo-1].tipoEvento;
									$scope.eventos[i].lat = lugares[eventos[i].idLugar-1].latitud;
									$scope.eventos[i].lng = lugares[eventos[i].idLugar-1].longitud;
									$scope.eventos[i].nombreLugar = lugares[eventos[i].idLugar-1].nombreLugar;
									$scope.eventos[i].fechaEvento = eventos[i].fechaEvento;
									$scope.eventos[i].titulo = eventos[i].tituloEvento;
									$scope.eventos[i].descripcion = eventos[i].descripcionEvento;
									$scope.eventos[evento].id=i++;
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
	$scope.obtenerUser = function(){
		$http.get('http://localhost:8080/EventoUsachJava/tipos').then(
			//success:
			function(response){
				$scope.tipos = response.data;
				var tipos = response.data;
				$http.get('http://localhost:8080/EventoUsachJava/lugares').then(
					//success:
					function(response){
						$scope.lugares = response.data;
						var lugares = response.data;
						if(auth.isLoggedIn()){
							$http.get('http://localhost:8080/EventoUsachJava/eventosusuarios').then(
								//success:
								function(response){
									eventosUsuario=response.data;
									$scope.eventosUsuario=[];
									i=0;
									for(eventousuario in eventosUsuario){
										if(eventosUsuario[i].idUsuario==session.getUser().idUsuario){
											$scope.eventosUsuario.push(eventosUsuario[i].idEvento);
										}
										i++;
									}
									eventosUsuario=$scope.eventosUsuario;
									$http.get('http://localhost:8080/EventoUsachJava/eventos').then(
										//success:
										function(response){
											eventos = response.data;
											$scope.eventos=[];
											i=0;
											j=0;
											for(evento in eventos){
												if(eventosUsuario.indexOf(eventos[i].idEvento)!=-1){
													var event = eventos[i];
													event.foto = tipos[eventos[i].idTipo-1].tipoEvento;
													event.lat = lugares[eventos[i].idLugar-1].latitud;
													event.lng = lugares[eventos[i].idLugar-1].longitud;
													event.nombreLugar = lugares[eventos[i].idLugar-1].nombreLugar;
													event.fechaEvento = eventos[i].fechaEvento;
													event.titulo = eventos[i].tituloEvento;
													event.descripcion = eventos[i].descripcionEvento;
													event.id=j++;
													i++;
													$scope.eventos.push(event);													
												}else{i++;}
											}
										},
										//failure:
										function(response){
											$scope.obtener();
										}
									);
								},
								//failure:
								function(response){
									//
								}
							);
						}
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
	$scope.obtenerE = function(){
		var idE=$rootScope.editEvent;
		$http.get('http://localhost:8080/EventoUsachJava/tipos').then(
			//success:
			function(response){
				$scope.tipos = response.data;
				var tipos = response.data;
				$http.get('http://localhost:8080/EventoUsachJava/lugares').then(
					//success:
					function(response){
						$scope.lugares = response.data;
						var lugares = response.data;
						$http.get('http://localhost:8080/EventoUsachJava/eventos/'+idE).then(
							//success:
							function(response){
								
								$scope.evento = response.data;
								$scope.editevent.nombre = $scope.evento.tituloEvento;
								$scope.editevent.descripcion = $scope.evento.descripcionEvento;
								$scope.editevent.inicio = new Date($scope.evento.inicioEvento);	
								$scope.editevent.fin = new Date($scope.evento.finEvento);
								$scope.editevent.estado = $scope.evento.habilitado;
								$scope.evento.foto = tipos[$scope.evento.idTipo-1].tipoEvento;
								$scope.evento.lat = lugares[$scope.evento.idLugar-1].latitud;
								$scope.evento.lng = lugares[$scope.evento.idLugar-1].longitud;
								$scope.evento.nombreLugar = lugares[$scope.evento.idLugar-1].nombreLugar;
								$scope.evento.fecha = $scope.evento.inicioEvento;
							},
							//failure:
							function(response){
								$scope.obtenerE();
							}
						);
					},
					//failure
					function(response){
						$scope.obtenerE();
					}
				);
			},
			//failure:
			function(response){
				$scope.obtenerE();
			}
		);
	}
	$scope.addMarker = function(x, y) {
		clearMap();
		var marker = new google.maps.Marker({
			position: {lat:x,lng:y},
			map: map,
			zoom: 19,
			animation: google.maps.Animation.DROP
		});
		markers.push(marker);
		map.setCenter({lat:x,lng:y});
	};
	$scope.details = function(id) {
		titulo=$scope.eventos[id].titulo;
		descripcion=$scope.eventos[id].descripcion;
		fechaInicio=new Date($scope.eventos[id].inicioEvento);
		fechaFin=new Date($scope.eventos[id].finEvento);
		contentString='<div style="font-size:12px;line-height:12px;color:#555;">'+
      '<span style="font-weight:bold;font-size:14px;">'+titulo+'<br/><br/></span>'+
      '<p>'+descripcion+'</p>'+
      '<p>Inicio Evento:<br/>Fecha: '+fechaInicio.toLocaleDateString()+'<br/>'+
      'Hora: '+fechaInicio.toLocaleTimeString()+'</p>'+
      '<p>Fin Evento:<br/>Fecha: '+fechaFin.toLocaleDateString()+'<br/>'+
      'Hora: '+fechaFin.toLocaleTimeString()+'</p>'+
      '</div>';
		var infowindow = new google.maps.InfoWindow({
    		content: contentString,
    		maxWidth: 200
		});
		infowindow.open(map,markers[0]);
		infowindows.push(infowindow);
	};
	$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
	$scope.edit = function(id){
		if(auth.isLoggedIn() && auth.isAdmin()){
			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
			$rootScope.editEvent = id;
			(function(ev){
				$mdDialog.show({
					templateUrl: 'views/editEvent.html',
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
			})();
		}else{
			return null;
		}
	}
	$scope.asiste = function(id){
		if(auth.isLoggedIn()){
		i=0
		for(e in $rootScope.even){
			//alert($rootScope.even[i] + "&"+ id);
			if($rootScope.even[i] == id)
				return true;
			i++;
		}
		}
		return false;
	}



	$scope.suscribe = function(id,asistir){
		if(auth.isLoggedIn()){
			var data_newuserevent = {}
			//alert(id);
			//alert($rootScope.session.getUser().idUsuario);
			data_newuserevent.idEvento = id;
			data_newuserevent.idUsuario = $rootScope.session.getUser().idUsuario;
			$http.post("http://localhost:8080/EventoUsachJava/eventosusuarios", data_newuserevent)
          .success(function(data, status) {
          		$location.path('/'); // si no es admin, lo tirar automagicamente a /user
          });
		}else{
			return null;
		}
	}
	$scope.desuscribe = function(id,asistir){
		if(auth.isLoggedIn()){

		$http.get("http://localhost:8080/EventoUsachJava/eventosusuarios")
          .then(function(response) {

          		var eventosu = response.data;
          		//alert(JSON.stringify(response.data))
          		var id_user_event = 0;
          		i=0
          		for( e in eventosu ){
          			//alert(eventosu[i].idEvento+"/"+id+" - "+eventosu[i].idUsuario+"/"+$rootScope.session.getUser().idUsuario);

          			if(eventosu[i].idEvento == id && eventosu[i].idUsuario == $rootScope.session.getUser().idUsuario){
          				id_user_event = eventosu[i].idEventoUsuario;
          				break;
          			}
          			i++;
          		}

          		var url = "http://localhost:8080/EventoUsachJava/eventosusuarios/eliminar/"+id_user_event;
			$http.get(url)
          .then(function(data, status) {
          		$location.path('/'); // si no es admin, lo tirar automagicamente a /user
          });

          });	
		
		}else{
			return null;
		}
	}

// ESTO ES DE NUEVO EVENTO
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

	$scope.create_event = function(newevent){		
		var data_newevent = {};
		data_newevent.descripcionEvento = newevent.descripcion;
		data_newevent.finEvento = newevent.fin; //newevent.fecha;
		data_newevent.inicioEvento = newevent.inicio; //newevent.fecha;
		data_newevent.tituloEvento =newevent.nombre;
		data_newevent.idUsuario = $rootScope.session.getUser().idUsuario; 
		data_newevent.idTipo = newevent.tipo.idTipo; 
		data_newevent.idLugar= newevent.lugar.idLugar;
		data_newevent.habilitado = false;

          $http.post("http://localhost:8080/EventoUsachJava/eventos", data_newevent)
          .success(function(data, status) {
            $location.path('/admin'); // si no es admin, lo tirar automagicamente a /user
          });
          $mdDialog.hide();	

          
	};
	$scope.edit_event = function(newevent){
		
		var data_newevent = {};
		data_newevent.descripcionEvento = newevent.descripcion;
		data_newevent.finEvento = newevent.fin; //newevent.fecha;
		data_newevent.inicioEvento = newevent.inicio; //newevent.fecha;
		data_newevent.tituloEvento =newevent.nombre;
		data_newevent.idUsuario = $rootScope.session.getUser().idUsuario; 
		data_newevent.idTipo = newevent.tipo.idTipo; 
		data_newevent.idLugar= newevent.lugar.idLugar;
		data_newevent.habilitado = newevent.estado; 
		var url_edit = "http://localhost:8080/EventoUsachJava/eventos/"+$rootScope.editEvent;
          $http.put(url_edit, data_newevent)
          .success(function(data, status) {
          		//$scope.obtener() // no funciona ni con esto :( la ultima opcion es refreshear lapagina.
          });
          $mdDialog.hide();	
	};

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
						alert(JSON.stringify(edit_user));
						  $http.put(url_edit, edit_user)
				          .success(function(data, status) {
				          		//$scope.obtener() // no funciona ni con esto :( la ultima opcion es refreshear lapagina.
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
						alert(JSON.stringify(edit_user));
						  $http.put(url_edit, edit_user)
				          .success(function(data, status) {
				          		//$scope.obtener() // no funciona ni con esto :( la ultima opcion es refreshear lapagina.
				          });
					}
				);
	}
}); 
