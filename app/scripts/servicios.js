EventosUsach.service('session',['$log', '$window','$rootScope',
  function($log, $window, $rootScope) {
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

EventosUsach.service('auth',['$http', 'session', '$location','$rootScope', 
  function($http, session,$location,$rootScope) {
    this.isLoggedIn = function isLoggedIn(){
      return session.getUser() !== null;
    };
    this.isAdmin = function isAdmin(){
      return session.isAdmin();
    };
    this.logIn = function(credentials,answer,$mdDialog){
      return $http
      	.get('http://localhost:9000/user_sample.json') //dato dummy mientras no hay db.
      	.then(function(response){
      		var data = response.data;
      		if(data.correo_usuario == credentials.user && data.contrasenha_usuario == credentials.password){
      			// Credenciales correctas
            credentials.error = false;
            session.setUser(data.correo_usuario);
            $mdDialog.hide(answer);
            if( data.esAdministrador ){
              session.setAdmin(data.correo_usuario);
            }
            $location.path('/user'); // Coloque un boton en la vista user en vez de tirar directo a /admin
      		}
          else
          { //Credenciales invalidas
      			session.destroy();
            credentials.error = true;
      		}

      	});
    };
    
 }]);

EventosUsach.run(['$rootScope', 'auth', 'session',
  function($rootScope, auth, session) {
    $rootScope.auth = auth;
    $rootScope.session = session;
   }]);