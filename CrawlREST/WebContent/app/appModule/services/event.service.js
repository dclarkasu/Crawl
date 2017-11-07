angular.module('appModule').factory('eventService', function($http, authService, $routeParams){
	var service = {};

	var id = $cookies.get("userId");
//	service.indexUserGroups = function() {
//		return $http ({
//			method : 'GET',
//			url : 'rest/users/1/groups'
//		})
//	};

	service.showEvent = function(eid) {
		console.log("in showEvent")
		return $http ({
			method : 'GET',
			url : 'rest/users/1/groups/1/events/'+eid
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

	service.updateEvent = function(eid, event) {
		return $http ({
			method : 'PUT',
			url : 'rest/users/1/groups/1/events/'+eid,
			headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : event
		})
	};

//	service.indexUsers = function() {
//		return $http({
//			method : 'GET',
//			url : 'rest/users'
//		})
//	};


	return service;
});
