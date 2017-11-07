angular.module('authModule')
  .factory('authService', function($http, $cookies) {
    var service = {};
    
    function saveUserCookie(user){
	    	$cookies.put('userId', user.id);
	    	$cookies.put('firstName', user.firstName);
	    	$cookies.put('lastName', user.lastName);
    		
    }
    function getUserCookie(){
    		return {
    			id: $cookies.get('userId'),
    			firsName: $cookies.get('firstName'),
    			lastName: $cookies.get('lastName')
    		}
    }
   

    function removeUserCookie() {
    		$cookies.remove('userId');
    		$cookies.remove('firstName');
    		$cookies.remove('lastName');
    }

    service.login = function(user) {
    		console.log(user);
    		return $http({
		      method : 'POST',
		      url : 'rest/auth/login',
		    	  headers : {
			          'Content-Type' : 'application/json'
			        },
			  data : user
		    })
		    .then(function(res){
		    		saveToken(res.data);
		    		return res;
		    }).
		    catch(function(err){
		    		console.log(err);
		    });
    }

    service.register = function(user) {
    		console.log(user);
    		return $http({
		      method : 'POST',
		      url : 'rest/auth/register',
		    	  headers : {
			          'Content-Type' : 'application/json'
			        },
			  data : user
		    })
		    .then(function(res){
		    		saveToken(res.data);
		    		return res;
		    });
    }

    service.logout = function() {
    		return $http({
		      method : 'POST',
		      url : 'rest/auth/logout',
		    })
		    .then(function(res){
		    		removeToken();
		    		return res;
		    });
    }

    return service;
  })
