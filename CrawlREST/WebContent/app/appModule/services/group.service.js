angular.module('appModule').factory('groupService', function($http, authService){
	var service = {};

	service.indexUserGroups = function() {
		return $http ({
			method : 'GET',
			url : 'rest/users/1/groups'
		})
	};

	service.showGroup = function() {
		console.log("in showGroup")
		return $http ({
			method : 'GET',
			url : 'rest/users/1/groups/1'
		})
	};

	service.indexMembers = function() {
		console.log('in member service');
		return $http ({
			method : 'GET',
			url : 'rest/users/1/group/1'
		})
	};

	service.createEvent = function(newEvent) {
		return $http({
			method : 'POST',
			url : 'rest/users/1/groups/1/events',
			headers : {
				'ContentType' : 'application/json'
			},
			data : newEvent
		})
	};

	service.updateGroup = function(group) {
		return $http ({
			method : 'PUT',
			url : 'rest/users/1/group/1',
			headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : group
		})
	};

	service.indexEvents = function() {
		return $http({
			method : 'GET',
			url : 'rest/users/1/groups/1/events'
		})
	};

<<<<<<< HEAD
=======
	service.deleteEvent = function(id) {
		return $http({
			method: 'DELETE',
			url : 'rest/users/1/groups/1/events/'+id
		})
	}

	service.indexUsers = function() {
		return $http({
			method : 'GET',
			url : 'rest/users'
		})
	};

	service.addUserToGroup = function(gid, uid) {
		return $http({
			method : 'PUT',
			url : 'rest/users/'+uid +'/groups/'+gid,
			headers : {
				'Content-Type' : 'application/json'
			},
			data : null
		})
	};

	service.removeUserFromGroup = function(gid, uid) {
		return $http({
			method : 'DELETE',
			url: 'rest/users/'+uid+'/group/'+gid,
		})
	};

>>>>>>> 2aaf8b54e11f4c6a06eadb4c282b6ba5ebc4b091
	return service;
});
