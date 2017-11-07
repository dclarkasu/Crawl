angular.module('appModule').factory('groupService', function($http, authService, $cookies){
	var service = {};
	
	var id = $cookies.get("userId");

	service.indexUserGroups = function() {
		return $http ({
			method : 'GET',
			url : `rest/users/${id}/groups`
		})
	};

	service.showGroup = function(gid) {
		console.log("in showGroup")
		return $http ({
			method : 'GET',
			url : `rest/users/${id}/groups/` + gid
		})
	};

	service.indexMembers = function(gid) {
		console.log('in member service');
		return $http ({
			method : 'GET',
			url : `rest/users/${id}/group/` + gid
		})
	};
	
	service.indexGroupMessages = function(gid) {
		console.log('messages');
		return $http ({
			method : 'GET',
			url : `rest/users/${id}/post/group/` + gid
		})
	};
//Needs a post id!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	service.createPost = function(newPost) {
		return $http({
			method : 'POST',
			url : `rest/users/${id}/posts/1/events`,
			headers : {
				'ContentType' : 'application/json'
			},
			data : newEvent
		})
	};

	service.createEvent = function(newEvent, gid) {
		return $http({
			method : 'POST',
			url : `rest/users/${id}/groups/${gid}/events`,
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

	service.updateGroup = function(group, gid) {
		return $http ({
			method : 'PUT',
			url : `rest/users/${id}/group/${gid}`,
			headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : group
		})
	};

	service.indexEvents = function(gid) {
		return $http({
			method : 'GET',
			url : `rest/users/${id}/groups/${gid}/events`
		})
	};

	service.deleteEvent = function(gid, eid) {
		return $http({
			method: 'DELETE',
			url : `rest/users/${id}/groups/${gid}/events/${eid}`
		})
	}

	service.indexUsers = function() {
		return $http({
			method : 'GET',
			url : `rest/usersList`
		})
	};

	service.addUserToGroup = function(gid, mid) {
		return $http({
			method : 'PUT',
			url : `rest/users/${id}/groups/${gid}/add/${mid}`,
			headers : {
				'Content-Type' : 'application/json'
			},
			data : null
		})
	};

	service.removeUserFromGroup = function(gid, mid) {
		return $http({
			method : 'DELETE',
			url: `rest/users/${id}/group/${gid}/remove/${mid}`,
		})
	};

	return service;
});
