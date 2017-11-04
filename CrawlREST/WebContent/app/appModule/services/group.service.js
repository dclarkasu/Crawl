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



	return service;
});
