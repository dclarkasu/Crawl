angular.module('appModule').factory('groupService', function($http, authService, $cookies, $rootScope){
	var service = {};



	service.indexUserGroups = function() {
		var id = $cookies.get("userId");
		return $http ({
			method : 'GET',
			url : `rest/users/${id}/groups`
		})
	};

	service.showGroup = function(gid) {
		console.log("in showGroup")
		var id = $cookies.get("userId");
		return $http ({
			method : 'GET',
			url : `rest/users/${id}/groups/` + gid
		})
	};

	service.indexMembers = function(gid) {
		console.log('in member service');
		var id = $cookies.get("userId");
		return $http ({
			method : 'GET',
			url : `rest/users/${id}/group/` + gid
		})
	};

	service.indexGroupMessages = function(gid) {
		console.log('messages');
		var id = $cookies.get("userId");
		return $http ({
			method : 'GET',
			url : `rest/users/${id}/post/group/` + gid
		})
	};
//Needs a post id!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


	service.createEvent = function(newEvent, gid) {
		var id = $cookies.get("userId");
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
			url : 'rest/users/'+ uid + '/group/'+ gid +'/post',
			headers : {
				'ContentType' : 'application/json'
			},
			data : newPost
		})
	};

	service.deletePost = function(uid, pid) {
		return $http({
			method : 'DELETE',
			url : 'rest/users/'+ uid + '/post/'+ pid

		})
	};

	service.updateGroup = function(group, gid) {
		console.log("gid: " + gid);
		var id = $cookies.get("userId");
		return $http ({
			method : 'PUT',
			url : `rest/users/${id}/group/${gid}`,
			headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : group
		})
		.then(function(res) {
			console.log("res from update", res);
			$rootScope.$broadcast('updatedGroup', {
				message : "Group Updated",
				group : res.data
			})

			return res;
		})
	};

	service.adminCheck = function(gid, uid) {

		return $http ({
			method : 'GET',
			url : `rest/users/${uid}/group/${gid}/admin`,

		})
	};

	service.indexEvents = function(gid) {
		var id = $cookies.get("userId");
		return $http({
			method : 'GET',
			url : `rest/users/${id}/groups/${gid}/events`
		})
	};

	service.deleteEvent = function(gid, eid) {
		var id = $cookies.get("userId");
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
		var id = $cookies.get("userId");
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
		var id = $cookies.get("userId");
		return $http({
			method : 'DELETE',
			url: `rest/users/${id}/group/${gid}/remove/${mid}`,
		})
	};

	service.deleteGroup = function(gid) {
		var id = $cookies.get("userId");
		return $http({
			method : 'DELETE',
			url : 'rest/users/'+ id + '/groups/'+ gid
		})
		.then(function(res) {
			$rootScope.$broadcast('deleteGroup', {
				message : "Group Deleted",
				groupID : gid
			})
			return res;
		})
	};

	return service;
});
