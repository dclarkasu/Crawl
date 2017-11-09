angular.module('authModule')
  .factory('authService', function($http, $cookies) {
    var service = {};
    
    function saveUserCookie(login){
	    	$cookies.put('userId', login.user.id);
	    	$cookies.put('username', login.username);
    		
    }
    service.getUserCookie = function(){
    		return {
    			id: $cookies.get('userId'),
    			username: $cookies.get('username'),
    		}
    }
   

    function removeUserCookie() {
    		$cookies.remove('userId');
    		$cookies.remove('username');
    }

    service.login = function(user) {
    		return $http({
		      method : 'POST',
		      url : 'rest/auth/login',
		    	  headers : {
			          'Content-Type' : 'application/json'
			        },
			  data : user
		    })
		    .then(function(res){
		    		saveUserCookie(res.data);
		    		return res;
		    }).
		    catch(function(err){
		    		console.log(err);
		    });
    }

    service.register = function(user) {
    		return $http({
		      method : 'POST',
		      url : 'rest/auth/register',
		    	  headers : {
			          'Content-Type' : 'application/json'
			        },
			  data : user
		    })
		    .then(function(res){
		    		saveUserCookie(res.data);
		    		return res;
		    });
    }

    service.logout = function() {
    		return $http({
		      method : 'POST',
		      url : 'rest/auth/logout',
		    })
		    .then(function(res){
		    		removeUserCookie();
		    		return res;
		    });
    }

    return service;
  })
