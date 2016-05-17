EventosUsach.controller('EventosController', function($scope,$http,$templateCache,$window) {
	$scope.eventos = null;
	$scope.fetch = function(){
		//$http({method: 'GET', url: 'http://localhost/frontendweb/app/scripts/eventosTest.json', cache: $templateCache}).
		$http({method: 'GET', url: 'http://localhost:9000/scripts/eventosTest.json', cache: $templateCache}).
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

	$scope.addMarker = function(x, y) {
		for(i=0;i<markers.length;i++){
			markers[i].setMap(null);
		}
		markers=[];
		var marker = new google.maps.Marker({
			position: {lat:x,lng:y},
			map: map,
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
		contentString='<div id="content">'+
      '<h1 style="font-decoration:bold;">'+titulo+'</h1>'+
      '<p>'+descripcion+'</p>'+
      '<a href="suscribe/'+i+'" style="color:#000;">Suscribir</a>'+
      '</div>';
		var infowindow = new google.maps.InfoWindow({
    		content: contentString,
    		maxWidth: 200
		});
		infowindows=[];
		infowindow.open(map,markers[0]);
		infowindows.push(infowindow);
		map.setCenter({lat:x,lng:y});
	};
}); 
