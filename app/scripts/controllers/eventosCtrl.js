EventosUsach.controller('EventosController', function($scope,$http,$templateCache,$window) {
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
								var eventos = response.data;
								i=0;
								for(evento in eventos){
									$scope.eventos[i].foto = tipos[eventos[i].idTipo-1].tipoEvento;
									$scope.eventos[i].lat = lugares[eventos[i].idLugar].latitud;
									$scope.eventos[i].lng = lugares[eventos[i].idLugar].longitud;
									$scope.eventos[i].nombreLugar = lugares[eventos[i].idLugar].nombreLugar;
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
}); 
