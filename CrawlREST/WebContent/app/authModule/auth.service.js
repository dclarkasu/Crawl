angular.module('authModule')
  .factory('authService', function($http, $cookies) {
    var service = {};

    var saveToken = function(user) {
    		$cookies.put('userId', user.id);
    		$cookies.put('email', user.email);
    }

    service.getToken = function() {
      return {
    	  	userId: $cookies.get('userId'),
    	  	email: $cookies.get('email')
      }
    }

    var removeToken = function() {
    		$cookies.remove('userId');
    		$cookies.remove('email');
    }

    service.login = function(user) {
    		console.log(user);
    		return $http({
		      method : 'POST',
		      url : 'rest/auth/login/',
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
