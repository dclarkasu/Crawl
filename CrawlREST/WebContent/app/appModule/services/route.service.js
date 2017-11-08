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
	
	service.removeVenue = function(rid,vid) {
		console.log("removing Venue from route")
		return $http ({
			method : 'PUT',
			url : 'rest/users/1/routes/'+rid +'/removeVenues/'+vid
		})
	};
	
	service.addVenue = function(rid, vid) {
		console.log("adding Venue from route")
		return $http ({
			method : 'PUT',
			url : 'rest/users/1/routes/'+ rid +'/addVenues/' + vid
		})
	};
	
	service.moveVenueUp = function(rid,vid) {
		console.log("moving Venue Up")
		return $http ({
			method : 'PUT',
			url : 'rest/users/1/routes/'+rid +'/venues/'+vid+'/change/0'
		})
	};
	
	service.indexAllVenues = function (uid, rid) {
		console.log("indexing Venues")
		return $http ({
			method : 'GET',
			url : 'rest/users/1/venuesExcept/' + rid
		})
	};
	
	service.moveVenueDown = function(rid,vid) {
		console.log("moving Venue down")
		return $http ({
			method : 'PUT',
			url : 'rest/users/1/routes/'+rid +'/venues/'+vid+'/change/2'
		})
	};

	service.indexRouteVenues = function() {
		console.log('in route service');
		return $http ({
			method : 'GET',
			url : 'rest/users/1/routes/1/routeVenues'
		})
	};
	
	service.adminCheck = function(rid, uid) {

		return $http ({
			method : 'GET',
			url : `rest/users/${uid}/route/${rid}/admin`,
		      
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