EventosUsach.controller('EventosController', function($scope,$http,$templateCache,$window) {
	$scope.eventos = null;
	$scope.tipos = [];
	$scope.fetch = function(){
		$http
      	.get('http://localhost:8080/EventoUsachJava/tipos')
      	.then(function(response){
			var data = response.data;
			var i=0;
			for(tipo in data){
				$scope.tipos.push(data[i].tipoEvento.replace("Ã³","o").replace("ó","o"));
				i++;
			}
		});

		$http
		.get('http://localhost:8080/EventoUsachJava/lugares')
		.then(function(response){
			var data_lugares = response.data;
			$http({method: 'GET', url: 'http://localhost:8080/EventoUsachJava/eventos', cache: $templateCache})
			.then(function(response) {
				$scope.eventos = response.data;
				i=0;
				for(evento in $scope.eventos){ //recopio valores para no modificar el template
					$scope.eventos[i].foto = $scope.tipos[$scope.eventos[i].idTipo-1];
					$scope.eventos[i].lat= data_lugares[$scope.eventos[i].idLugar].latitud;
					$scope.eventos[i].lng = data_lugares[$scope.eventos[i].idLugar].longitud;
					$scope.eventos[i].nombreLugar =data_lugares[$scope.eventos[i].idLugar].nombreLugar;
					$scope.eventos[i].titulo = $scope.eventos[i].tituloEvento;
					$scope.eventos[i].fechaEvento = $scope.eventos[i].fechaEvento;
					$scope.eventos[i].descripcion = $scope.eventos[i].descripcionEvento;
					$scope.eventos[evento].id=i++;
					}
				}, function(response) {
				$scope.eventos = response.data || "Request failed";
				i=0;
				for(evento in $scope.eventos){
					$scope.eventos[i].foto = $scope.tipos[$scope.eventos[i].idTipo];
					$scope.eventos[i].latitud = data_lugares[$scope.eventos[i].idLugar].latitud;
					$scope.eventos[i].longitud = data_lugares[$scope.eventos[i].idLugar].longitud;
					$scope.eventos[i].nombreLugar =data_lugares[$scope.eventos[i].idLugar].nombreLugar;
					$scope.eventos[i].fechaEvento = $scope.eventos[i].fechaEvento;
					$scope.eventos[i].titulo = $scope.eventos[i].tituloEvento;
					$scope.eventos[i].descripcion = $scope.eventos[i].descripcionEvento;
					$scope.eventos[evento].id=i++;
					}
				});
		});
	}

	$scope.addMarker = function(x, y) {
		for(i=0;i<markers.length;i++){
			markers[i].setMap(null);
		}
		markers=[];
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
		for(i=0;i<infowindows.length;i++){
			infowindows[i].close();
		}
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
		infowindows=[];
		infowindow.open(map,markers[0]);
		infowindows.push(infowindow);
	};
}); 
