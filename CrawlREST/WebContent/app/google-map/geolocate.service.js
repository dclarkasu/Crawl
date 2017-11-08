angular.module('appModule')
.factory('geolocate', function($http){
	var service = {};
	
	var geocoder = new google.maps.Geocoder();
	
	service.geocodeAddress = function(address){
		geocoder.geocode({'address':address},function(result, status){
			if(status === 'OK'){
				result[0].geometry.location;
			}
		});
	}
	return service;
})