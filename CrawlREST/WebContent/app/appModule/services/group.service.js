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

	service.updateGroup = function(group) {
		return $http ({
			method : 'PUT',
			url : 'rest/users/1/group/1',
			headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : group
		})
	}

	return service;
});
