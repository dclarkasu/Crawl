angular.module('appModule')
.component('venue',{
	templateUrl: 'app/appModule/venue/venue.component.html',
	controller: function(venueService, $routeParams, $location, geolocate, $rootScope){
//		AIzaSyBEw2cCO_zGlAgAWJhO8uMTiqe95wBLlEE google map api key
		var vm = this;
		vm.venue = null;
		vm.copy = null;
		vm.copyHours = null;
		vm.update = null;
		vm.updateHours = null;
		vm.venueList = [];
		vm.showList = true;
		
		vm.states = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID"
			,"IL","IN","IA","KS","KY","LA","ME","MT","NE","NV","NH","NJ","NM","NY","NC"
			,"ND","OH","OK","OR","MD","MA","MI","MN","MS","MO","PA","RI","SC","SD","TN"
			,"TX","UT","VT","VA","WA","WV","WI","WY"
		];
		vm.hoursList = ['1','2','3','4','5','6','7','8','9','10','11','12'];
		vm.APList = ['AM','PM'];
		vm.minList = ['00','15','30','45'];
		
		if($routeParams.vid){
			loadVenue();
			vm.showList = false;
		} else {
			loadVenueList();
			vm.showList = true;
		}
		
		vm.showCreate = function(){
			vm.copy = {};
			vm.copyHours = {};
		};
		vm.cancelCreate = function(){
			vm.copy = null;
			vm.copyHours = null;
		}
		vm.makeInactive = function(venue){
			venueService.makeVenueInactive(venue.id)
			.then(function(res){
				loadVenue();
			})
			.catch(function(err){
				console.log(err)
			})
		};
		vm.createVenue = function(){
			vm.copy.hours = createHoursString(vm.copyHours);
			console.log(vm.copy);
			var address = getGeocode(vm.copy.address);
			vm.copy.address = address;
			console.log(vm.copy);
//			venueService.createVenue(vm.copy)
//			.then(function(res){
//				console.log(res.data);
//				var id = res.data.id;
//				$location.path("/venue/" + id);
//			})
//			.catch(function(err){
//				console.log(err);
//			});
		}
		
		vm.showUpdate = function(){
			vm.update = angular.copy(vm.venue);
			vm.updateAddress = vm.update.address;
			vm.updateHours = parseHour(vm.update.hours);
			console.log(vm.update);
			console.log(vm.updateAddress);
		};
		vm.updateVenue = function(){
			vm.update.hours = createHoursString(vm.updateHours);
			console.log(vm.update);
			vm.update.address = null;
			venueService.updateVenue(vm.update, $routeParams.vid)
			.then(function(res){
				vm.update = null;
				vm.updateAddress = null;
				loadVenue();
			})
			.catch(function(err){
				console.log(err);
			})
		};
		vm.updateVenueAddress = function(venue){
			console.log(venue.address);
			var address = getGeocode(venue.address);
			venueService.updateAddress(venue.address, $routeParams.vid)
			.then(function(res){
				vm.update = null;
				vm.updateAddress = null;
				loadVenue();
			})
			.catch(function(err){
				console.log(err)
			})
		};
		vm.updateVenueContact = function(){
			console.log(vm.update);
			venueService.updateContact(vm.update.contact, vm.update.contact.id)
			.then(function(res){
				vm.update = null;
				vm.updateAddress = null;
				loadVenue();
			})
			.catch(function(err){
				console.log(err);
			});
		}
		vm.cancelUpdate = function(){
			vm.update = null;
			vm.updateAddress = null;
		}
		function getGeocode(address){
			var textAddress = address.street + " " + address.city + " " + address.state + " " + address.zip;
			console.log(textAddress);
			geolocate.geocodeAddress(textAddress)
			.then(function(res){
				console.log(res.cord.lat());
				console.log(res.cord.lng());
				address.longitude = res.cord.lng();
				address.latitude = res.cord.lat();
			})
			.catch(function(err){
				console.log(err);
			});
			return address;
		}
		function createHoursString(hourObj){
			return hourObj.openHour +':'+ hourObj.openMin + hourObj.openAP 
			+'-'+ hourObj.closeHour +':'+ hourObj.closeMin + hourObj.closeAP;
		}
		function parseHour(hour){
			hourObj = {};
			var hoursSection = hour.split('-');
			var open = hoursSection[0].split(':');
			var close = hoursSection[1].split(':');
			hourObj.openHour = open[0];
			hourObj.openMin= open[1].slice(0,2);
			hourObj.openAP = open[1].slice(2);
			hourObj.closeHour = close[0];
			hourObj.closeMin = close[1].slice(0,2);
			hourObj.closeAP = close[1].slice(2); 
			return hourObj;
		}
		function loadVenue(){
			venueService.showVenue($routeParams.vid)
			.then(function(res){
				vm.venue = res.data;
				console.log(vm.venue);
				cord = {
					lng : vm.venue.address.longitude,
					lat : vm.venue.address.latitude,
					title : vm.venue.name
				};
				$rootScope.$broadcast('map', {
					center: cord,
					markers : [cord],
					zoom: 14
				});
			})
			.catch(function(err){
				console.log(err);
			});
		}
		function loadVenueList(){
			venueService.indexVenue()
			.then(function(res){
				vm.venueList = res.data;
			})
			.catch(function(err){
				console.log(err);
			});
		}
	},
	controllerAs: 'vm'
});