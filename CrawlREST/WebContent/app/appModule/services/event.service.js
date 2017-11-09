angular.module('appModule').factory('eventService', function($http, authService, $routeParams, $cookies){
	var service = {};
	
//	service.indexUserGroups = function() {
//		return $http ({
//			method : 'GET',
//			url : 'rest/users/1/groups'
//		})
//	};

	service.showEvent = function(eid) {
		var id = $cookies.get("userId");
		console.log("in showEvent")
		return $http ({
			method : 'GET',
			url : `rest/users/${id}/group/events/${eid}`
		})
	};
	
	service.adminCheck = function(eid, uid) {
		return $http ({
			method : 'GET',
			url : `rest/users/${uid}/event/${eid}/admin`,  
		})
	};

	// service.showGroup = function(eid) {
	// 	console.log("in showEvent")
	// 	return $http ({
	// 		method : 'GET',
	// 		url : 'rest/users/1/groups/1/events/'+eid
	// 	})
	// };

//	service.indexMembers = function() {
//		console.log('in member service');
//		return $http ({
//			method : 'GET',
//			url : 'rest/users/1/group/1'
//		})
//	};
//
//	service.createEvent = function(newEvent) {
//		return $http({
//			method : 'POST',
//			url : 'rest/users/1/groups/1/events',
//			headers : {
//				'ContentType' : 'application/json'
//			},
//			data : newEvent
//		})
//	};

	service.updateEvent = function(eid, gid, event) {
		var id = $cookies.get("userId");
		return $http ({
			method : 'PUT',
			url : `rest/users/${id}/groups/${gid}/events/${eid}`,
			headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : event
		})
	};

	service.addRouteToEvent = function(eid, rid) {
		var id = $cookies.get("userId");
		return $http ({
			method : 'PUT',
			url : `rest/users/${id}/group/events/${eid}/route/${rid}`,
			headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : event
		})
	};
	
//	service.adminCheck = function(gid, uid) {
//		console.log("Admin Check Check")
//		return $http ({
//			method : 'GET',
//			url : `rest/users/${uid}/event/${gid}/admin`,
//		      
//		})
//	};

	service.indexRoutes = function() {
		var id = $cookies.get("userId");
		return $http({
			method : 'GET',
			url : `rest/users/${id}/routes`
		})
	};


	return service;
});
