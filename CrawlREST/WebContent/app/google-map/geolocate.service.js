angular.module('appModule')
.factory('geolocate', function($http){
	var service = {};
	
	var geocoder = new google.maps.Geocoder();
	
	service.geocodeAddress = function(address){
		return new Promise(function(resolve, reject){
			geocoder.geocode({'address':address},function(result, status){
				resolve({cord:result[0].geometry.location})
			});
		})
	}
	return service;
})