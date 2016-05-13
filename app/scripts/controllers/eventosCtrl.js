EventosUsach.controller('EventosController', function($scope,$window) {
	imgConcierto = 'img/icons/music_concert_hall-32.png';
	imgSimposio = 'img/icons/museum-32.png';
	imgAsamblea = 'img/icons/special_location-32.png';
	$scope.eventos = [{
		foto : imgConcierto,
		titulo : 'Concierto Aula Magna',
		descripcion: 'Concierto de Orquesta Usach junto a Dania Montanares',
		lat:-33.449942,
		lng:-70.686613
	}, {
		foto : imgAsamblea,
		titulo : 'Asamblea Diinf',
		descripcion: 'Asamblea triestamental Departamento Ingeniería Informática',
		lat:-33.449742,
		lng:-70.687213
	}, {
		foto : imgSimposio,
		titulo : 'Simposio Dr Mauricio Marín',
		descripcion: 'Simposio sobre gestión de proyectos de ingenieria de software',
		lat:-33.449942,
		lng:-70.687013
	}, {
		foto : imgSimposio,
		titulo : 'Charla BDs no relacionales',
		descripcion: 'Charla sobre el uso de bases de datos no relacionales',
		lat:-33.446434,
		lng:-70.683169
	}];
	$scope.addMarker = function(x, y) {
		for(i=0;i<markers.length;i++){
			markers[i].setMap(null);
		}
		var marker = new google.maps.Marker({
			position: {lat:x,lng:y},
			map: map,
			animation: google.maps.Animation.DROP
		});
		markers.push(marker);
		map.setCenter({lat:x,lng:y});
	};
}); 
