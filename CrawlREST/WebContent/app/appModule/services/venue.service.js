angular.module('appModule')
.factory('venueService', function($http, $cookies){
	
	var service = {};
	
	service.indexVenue = function(){
		return $http({
			method: 'GET',
			url: 'rest/users/' + $cookies.get('userId') + '/venues'
		});
	};
	service.indexByCity = function(city){
		return $http({
			method: 'GET',
			url: 'rest/users/' + $cookies.get('userId') + '/venues/search/' + city
		});
	}
	service.showVenue = function(id){
		return $http({
			method: 'GET',
			url: 'rest/users/' + $cookies.get('userId') + '/venues/' + id
		});
	}
	service.createVenue = function(venue){
		return $http({
			method: 'POST',
			url: 'rest/users/' + $cookies.get('userId') + '/venues',
			headers: {
				'Content-Type' : 'application/json'
			},
			data: venue
		});
	}
	service.updateVenue = function(venue, id){
		return $http({
			method: 'PUT',
			url: 'rest/users/' + $cookies.get('userId') + '/venues/' + id,
			header: {
				'Content-Type' : 'application/json'
			},
			data: venue
		});
	}
	service.makeVenueInactive = function(id){
		return $http({
			method: 'PUT',
			url: 'rest/users/' + $cookies.get('userId') + '/venues/' + id + '/deactivate'
		});
	}
	service.makeVenueActive = function(id){
		return $http({
			method: 'PUT',
			url: 'rest/users/' + $cookies.get('userId') + '/venues/' + id + '/activate'
		});
	}
	service.createAddress = function(address){
		return $http({
			method: 'POST',
			url: 'rest/users/' + userId + '/venues/address',
			header: {
				'Content-Type' : 'application/json'
			},
			data: address
		});
	}
	service.updateAddress = function(address, id){
		console.log(id);
		return $http({
			method: 'PUT',
			url: 'rest/users/' + $cookies.get('userId') + '/venues/address/' + id,
			header: {
				'Content-Type' : 'application/json'
			},
			data: address
		});
	}
	service.addAddressToVenue = function(address, id){
		return $http({
			method: 'POST',
			url: 'rest/users/' + $cookies.get('userId') + '/venues/' + id + 'address',
			header: {
				'Content-Type' : 'application/json'
			},
			data: address
		});
	}
	service.addContactToVenue = function(contact, id){
		return $http({
			method: 'POST',
			url: 'rest/users/' + $cookies.get('userId') + '/venues/' + id + 'contacts',
			header: {
				'Content-Type' : 'application/json'
			},
			data: contact
		});
	}
	service.updateContact = function(contact, id){
		return $http({
			method: 'PUT',
			url: 'rest/users/' + $cookies.get('userId') + '/contact/' + id,
			headr: {
				'Content-Type' : 'application/json'
			},
			data: contact
		});
	}
	return service;
});