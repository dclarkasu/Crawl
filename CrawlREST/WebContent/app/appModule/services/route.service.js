angular.module('appModule').factory('routeService', function($http, authService){
	var service = {};

	service.indexEventRoutes = function() {
		return $http ({
			method : 'GET',
			url : 'rest/users/1/routes'
		})
	};

	service.showRoute = function() {
		console.log("in showRoute")
		return $http ({
			method : 'GET',
			url : 'rest/users/1/routes/1'
		})
	};

	service.indexVenues = function() {
		console.log('in route service');
		return $http ({
			method : 'GET',
			url : 'rest/users/1/routes/1/venues'
		})
	};

	service.updateRoute = function(route) {
		return $http ({
			method : 'PUT',
			url : 'rest/users/1/route/1',
			headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : route
		})
	}

	return service;
});