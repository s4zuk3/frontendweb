EventosUsach.service('session',['$log', '$window',
  function($log, $window) {
 	this._user = JSON.parse($window.localStorage.getItem('session.user'));
      this._admin = JSON.parse($window.localStorage.getItem('session.admin'));
           
	this.getUser = function(){
      		return this._user;
    	 };

    	this.setUser = function(user){
      this._user = user;
      $window.localStorage.setItem('session.user', JSON.stringify(user));
      return this;
    	};
      this.isAdmin = function(){
        if(this._admin !== null)
          return true;
       };

      this.setAdmin = function(admin){
      this._admin = admin;
      $window.localStorage.setItem('session.admin', JSON.stringify(admin));
      return this;
      };
    	this.destroy = function destroy(){
      		this.setUser(null);
          this.setAdmin(null);
    	};
 }]);

EventosUsach.service('auth',['$http', 'session', '$location', 
  function($http, session,$location) {
    this.isLoggedIn = function isLoggedIn(){
      return session.getUser() !== null;
    };
    this.isAdmin = function isAdmin(){
      return session.isAdmin();
    };
    this.logIn = function(credentials,answer,$mdDialog,$mdToast){
      return $http
      	.get('http://localhost:8080/EventoUsachJava/usuarios')
      	.then(function(response){
      		var data = response.data;
          credentials.id=-1;
          i=0;
          for(user in data){
            if(data[i].correoUsuario == credentials.user){
              credentials.id = data[i].idUsuario;
              break;
            }
            i++;
          }
          if(credentials.id == -1){ //no encontrado
            session.destroy();
            credentials.error = true;
            return;
          }
      		if(data[i].correoUsuario == credentials.user && data[i].contrasenhaUsuario == credentials.password){
      			// Credenciales correctas
            if(data[i].idTipoEstado == 2){
              $mdToast.show($mdToast.simple().textContent('Cuenta desabilitada, favor contactar con un administrador.').hideDelay(1500).position('bottom left'));
              return;
            }else if(data[i].idTipoEstado == 3){
              $mdToast.show($mdToast.simple().textContent('Cuenta bloqueada, favor contactar con un administrador.').hideDelay(1500).position('bottom left'));
              return;
            }
            credentials.error = false;
            session.setUser(data[i]);
            $mdDialog.hide(answer);
            if( data[i].administrador ){
              session.setAdmin(data[i]);
            }
            $location.path('/user'); // Coloque un boton en la vista user en vez de tirar directo a /admin
            $mdToast.show($mdToast.simple().textContent('Sesión iniciada.').hideDelay(1500).position('bottom left'));
      		}
          else
          { //Credenciales invalidas
      			session.destroy();
            credentials.error = true;
      		}

      	});
    };
     this.register = function(newuser,answer,$mdDialog,$mdToast){
      return $http
        .get('http://localhost:8080/EventoUsachJava/usuarios')
        .then(function(response){
          var data = response.data;
          newuser.id=-1;  
          i=0;
          for(user in data){
            if(data[i].correoUsuario == newuser.correo){
              newuser.id = data[i].idUsuario;
              break;
            }
            i++;
          }

          if(newuser.id != -1){ //encontrado
            newuser.email_usado = true;
            return;
          }
          var data_newuser = {};
          data_newuser.administrador = false;
          data_newuser.apellidoUsuario = newuser.apellido;
          data_newuser.carreraUsuario =newuser.carrera;
          data_newuser.contrasenhaUsuario =newuser.password;
          data_newuser.correoUsuario =newuser.correo;
          data_newuser.idTipoEstado = 1;
          data_newuser.nombreUsuario=newuser.nombre;

          $http.post("http://localhost:8080/EventoUsachJava/usuarios", data_newuser)
          .success(function(data, status) {
            data_newuser.idUsuario=i;
            session.setUser(data_newuser); //Dejarlo logeado una vez creada al cuenta.
            $location.path('/user');
            $mdDialog.hide(answer);
            $mdToast.show($mdToast.simple().textContent('Usuario creado exitosamente. Sesión iniciada.').hideDelay(1500).position('bottom left'));
          });
          
        });
    };
    
 }]);

EventosUsach.run(['$rootScope', 'auth', 'session',
  function($rootScope, auth, session) {
    $rootScope.auth = auth;
    $rootScope.session = session;
   }]);
