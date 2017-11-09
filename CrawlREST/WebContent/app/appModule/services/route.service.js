angular.module('appModule').factory('routeService', function($http, authService, $cookies){
	var service = {};
	
	var id = $cookies.get('userId');
	
	service.indexEventRoutes = function() {
		return $http ({
			method : 'GET',
			url : `rest/users/`+ $cookies.get('userId') + `/routes`
		})
	};

	service.showRoute = function(rid) {
		console.log("in showRoute")
		return $http ({
			method : 'GET',
			url : `rest/users/` + $cookies.get('userId') + `/routes/${rid}` 
		})
	};
	
	service.createRoute= function(eid) {
		var id = $cookies.get("userId");
		return $http ({
			method : 'POST',
			url : `rest/users/${id}/routes`,
			headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : event
		})
	};
	
	service.removeVenue = function(rid,vid) {
		console.log("removing Venue from route")
		return $http ({
			method : 'PUT',
			url : `rest/users/` + $cookies.get('userId') + `/routes/${rid}/removeVenues/${vid}`
		})
	};
	
	service.addVenue = function(rid, vid) {
		console.log("adding Venue from route")
		return $http ({
			method : 'PUT',
			url : `rest/users/` + $cookies.get('userId') + `/routes/${rid}/addVenues/${vid}`
		})
	};
	
	service.newVenuePage = function() {
		console.log("VENUE CLICK 2")
		return $http ({
			method : 'GET',
			url : `users/` + $cookies.get('userId') + `/venues`
		})
	};
	
	service.moveVenueUp = function(rid,vid) {
		console.log("moving Venue Up")
		return $http ({
			method : 'PUT',
			url : `rest/users/` + $cookies.get('userId') + `/routes/${rid}/venues/${vid}/change/0`
		})
	};
	
	service.indexAllVenues = function (rid) {
		console.log("indexing Venues")
		return $http ({
			method : 'GET',
			url : `rest/users/` + $cookies.get('userId') + `/venuesExcept/${rid}`
		})
	};
	
	service.moveVenueDown = function(rid,vid) {
		console.log("moving Venue down")
		return $http ({
			method : 'PUT',
			url : `rest/users/` + $cookies.get('userId') + `/routes/${rid}/venues/${vid}/change/2`
		})
	};

	service.indexRouteVenues = function(rid) {
		console.log('in route service');
		return $http ({
			method : 'GET',
			url : `rest/users/` + $cookies.get('userId') + `/routes/${rid}/routeVenues`
		})
	};
	
	service.adminCheck = function(rid, uid) {

		return $http ({
			method : 'GET',
			url : `rest/users/${uid}/route/${rid}/admin`,
		      
		})
	};

	service.updateRoute = function(route, rid) {
		return $http ({
			method : 'PUT',
			url : `rest/users/` + $cookies.get('userId') + `/route/${rid}`,
			headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : route
		})
	}

	return service;
});