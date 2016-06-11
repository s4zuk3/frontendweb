EventosUsach.controller('EventosController', function($scope,$http,$templateCache,$window,$rootScope,$mdDialog, $mdMedia) {
	auth = $rootScope.auth;
	session = $rootScope.session;
	hoy = new Date();
	$scope.alert = function(t){$window.alert(t);}
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
									if(diffDays>0){
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
									$scope.eventos[evento].id=i++;
								}
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
											for(evento in eventos){
												if(eventosUsuario.indexOf(eventos[i].idEvento)!=-1){
													$scope.eventos[i].foto = tipos[eventos[i].idTipo-1].tipoEvento;
													$scope.eventos[i].lat = lugares[eventos[i].idLugar-1].latitud;
													$scope.eventos[i].lng = lugares[eventos[i].idLugar-1].longitud;
													$scope.eventos[i].nombreLugar = lugares[eventos[i].idLugar-1].nombreLugar;
													$scope.eventos[i].fechaEvento = eventos[i].fechaEvento;
													$scope.eventos[i].titulo = eventos[i].tituloEvento;
													$scope.eventos[i].descripcion = eventos[i].descripcionEvento;
													$scope.eventos[i].id=i++;													
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
		fecha=new Date($scope.eventos[id].inicioEvento);
		contentString='<div style="font-size:12px;line-height:12px;color:#555;">'+
      '<span style="font-weight:bold;font-size:14px;">'+titulo+'<br/><br/></span>'+
      '<p>'+descripcion+'</p>'+
      '<p>Fecha: '+fecha.toLocaleDateString()+'<br/>'+
      'Hora: '+fecha.toLocaleTimeString()+'</p>'+
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
			$rootScope.editEvent = id+1;
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
			for(evento in $scope.eventosUsuario){
				if(id==evento)return true;
			}
			return false;
		}else{
			return false;
		}
	}
	$scope.suscribe = function(id,asistir){
		if(auth.isLoggedIn()){

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


						var data_newevent = {};
			          data_newevent.descripcionEvento = newevent.descripcion;
			          data_newevent.finEvento = newevent.fecha; //newevent.fecha;
			          data_newevent.inicioEvento = newevent.fecha; //newevent.fecha;
			          data_newevent.tituloEvento =newevent.nombre;
			          data_newevent.idUsuario = $rootScope.session.getUser().idUsuario; 
			          data_newevent.idTipo = newevent.tipo.idTipo; // valor dummy por ahora
			          data_newevent.idLugar= newevent.lugar.idLugar; // valor dummy por ahora

          $http.post("http://localhost:8080/EventoUsachJava/eventos", data_newevent)
          .success(function(data, status) {
            
          });
          $mdDialog.hide();


					},
					//failure
					function(response){
						
					}
				);
			},
			//failure:
			function(response){
				
			}
		);






		


	};
}); 
