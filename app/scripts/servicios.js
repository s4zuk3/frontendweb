EventosUsach.service('session',['$log', '$window','$rootScope',
  function($log, $window, $rootScope) {
  		 this._user = JSON.parse($window.localStorage.getItem('session.user'));
  		 this.getUser = function(){
      		return this._user;
    	 };

    	this.setUser = function(user){
      this._user = user;
      $window.localStorage.setItem('session.user', JSON.stringify(user));
      return this;
    	};

    	this.destroy = function destroy(){
      		this.setUser(null);
    	};
 }]);

EventosUsach.service('auth',['$http', 'session', '$location',
  function($http, session,$location) {
    this.isLoggedIn = function isLoggedIn(){
      return session.getUser() !== null;
    };
    this.logIn = function(credentials,answer,$mdDialog){
      return $http
      	.get('http://localhost:9000/user_sample.json') //dato dummy mientras no hay db.
      	.then(function(response){
      		var data = response.data;
      		if(data.user == credentials.user && data.pass == credentials.password){
      			session.setUser(data.user);
      			$mdDialog.hide(answer);
      			$location.path('/user');
      		}else{
      			session.destroy();
      			alert("Invalido.");
      		}

      	});
    };
    
 }]);

EventosUsach.run(['$rootScope', 'auth', 'session',
  function($rootScope, auth, session) {
    $rootScope.auth = auth;
    $rootScope.session = session;
   }]);