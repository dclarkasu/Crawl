angular.module('appModule')
.factory('venueService', function($http){
	
	var service = {};
	
	service.indexVenue = function(){
		return $http({
			method: 'GET',
			url: 'rest/users/1/venues'
		});
	}
	
	return service;
});