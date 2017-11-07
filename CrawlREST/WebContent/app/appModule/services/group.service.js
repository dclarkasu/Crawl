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
	
	service.indexGroupMessages = function() {
		console.log('messages');
		return $http ({
			method : 'GET',
			url : 'rest/users/1/post/group/1'
		})
	};

	service.createPost = function(newPost) {
		return $http({
			method : 'POST',
			url : 'rest/users/1/posts/1/events',
			headers : {
				'ContentType' : 'application/json'
			},
			data : newEvent
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
	
	service.createPost = function(uid, gid, newPost) {
		return $http({
			method : 'POST',
			url : 'rest/users/1/group/'+ gid +'/post',
			headers : {
				'ContentType' : 'application/json'
			},
			data : newPost
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

	return service;
});
