EventosUsach.controller('EventosController', function($scope,$http,$location,$templateCache,$window,$rootScope,$mdDialog, $mdMedia,$mdToast) {
	auth = $rootScope.auth;
	session = $rootScope.session;
	$scope.editevent = {}
	hoy = new Date();
	$scope.alert = function(t){$window.alert(t);}
	$scope.stringify = function(o){alert(JSON.stringify(o));}
	$scope.obtener = function(){
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
								i=0;
								while(i<$scope.eventos.length){
									fecha = new Date($scope.eventos[i].inicioEvento);
									diffDays = Math.ceil((hoy.getTime() - fecha.getTime())/ (1000 * 3600 * 24)); 
									if(diffDays>0 || $scope.eventos[i].habilitado==false){
										$scope.eventos.splice(i,1);
									}else{
										i++;
									}
								}
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
									$scope.eventos[i].idx=999;
									$scope.eventos[evento].id=i++;

								}
								if(auth.isLoggedIn()){
									$http.get('http://localhost:8080/EventoUsachJava/eventosusuarios').then(
										//success:
										function(response){
											$http.get('http://localhost:8080/EventoUsachJava/preferencias').then(
												function(response){
													var preferencias = response.data;
													i=0;
													for(e in preferencias){
														if(preferencias[i].idUsuario==session.getUser().idUsuario){
															j=0;
															for(ev in $scope.eventos){
																if($scope.eventos[j++].idTipo==preferencias[i].idTipo)
																	$scope.eventos[j-1].idx=preferencias[i].idTipo;
															}
														};
														i++;
													}
												}
											);
											eventosUsuario=response.data;
											$scope.eventosUsuario=[];
											var even = [];
											i=0;
											for(eventousuario in eventosUsuario){
												if(eventosUsuario[i].idUsuario==session.getUser().idUsuario){
													//$scope.eventos[eventosUsuario[i].idEvento].asisto = true;
													even.push(eventosUsuario[i].idEvento);
													$scope.eventosUsuario.push(eventosUsuario[i].idEvento);
												}
												i++;
											}
											eventosUsuario=$scope.eventosUsuario;
											$rootScope.even = even;
										},
										//failure:
										function(response){
											//
										}
									);
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
													event.idx=999;
													event.id=j++;
													i++;
													$scope.eventos.push(event);													
												}else{i++;}
											}
											$http.get('http://localhost:8080/EventoUsachJava/preferencias').then(
												function(response){
													i=0;
													for(e in response.data){
														if(response.data[i].idUsuario==session.getUser().idUsuario){
															j=0;
															for(ev in $scope.eventos){
																if($scope.eventos[j++].idTipo==response.data[i].idTipo)
																	$scope.eventos[j-1].idx=response.data[i].idTipo;
															}
														};
													i++;
													}
												}
											);

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
			$mdToast.show($mdToast.simple().textContent('Evento Creado Exitosamente.').hideDelay(1500).position('bottom left'));
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
				$mdToast.show($mdToast.simple().textContent('Evento Editado Exitosamente.').hideDelay(1500).position('bottom left'));
          });
          $mdDialog.hide();	
	};
}); 
