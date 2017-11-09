angular.module('appModule').component('route', {
	templateUrl : "app/appModule/route/route.component.html",
	controller : function(routeService, $routeParams, $cookies) {
		//Variables
		var vm = this;

		vm.route = null;
		vm.routeVenues = null;
		vm.allVenues = null;
		vm.admin = null;

		vm.loadRoute = function() {
			var promise = routeService.showRoute();

			promise.then(function(res){
				console.log(res);
				console.log('in promise');

				vm.route = res.data;
				console.log("Route ID:"+ vm.route.id)
				vm.loadAllVenuesExcept(vm.route.id);
			}).catch(function(err){
				console.log(err);
			});
		}

		vm.adminCheck = function() {
			var promise = routeService.adminCheck($routeParams.rid, $cookies.get('userId'));
			promise.then(function(res){
				vm.admin = res.data;
			}).catch(function(err){
				console.log(err);
			});

		}

		vm.adminCheck();

		vm.addVenue = function(rid, venue) {
			routeService.addVenue(rid, venue.id)
			.then(function(res){
				vm.resetPage();
			})
		}

		vm.removeVenue = function(rid,vid) {
			routeService.removeVenue(rid,vid)
			.then(function(res){
				vm.resetPage();
			})
		}


		vm.venueUp = function(rid,vid) {
			routeService.moveVenueUp(rid,vid)
			.then(function(res){
				vm.resetPage();
			})
		}
		vm.venueDown = function(rid,vid) {
			routeService.moveVenueDown(rid,vid)
			.then(function(res){
				vm.resetPage();
			})
		}


		vm.loadRouteVenues = function() {
			console.log('in load venues');
			routeService.indexRouteVenues()
			.then(function(res) {
				vm.routeVenues = res.data;
				console.log(vm.routeVenues);
				var cords = CreateCordArray();
				console.log(cords);
//				$rootScope.$broadcast('map', {
//					center: cords[0],
//					markers : cords,
//					zoom: 14
//				});
			})
		};


		vm.loadAllVenuesExcept = function (rid){
			console.log('in Load All Venues');
			console.log(rid);
			routeService.indexAllVenues(rid).then(function(res){
				vm.allVenues = res.data;
				console.log(vm.indexAllVenues);
			})
		};


		vm.loadRoute();
		console.log('vm.route: ' + vm.route);
		vm.loadRouteVenues();
		console.log('vm.routeVenues: ' + vm.routeVenues);
		vm.loadAllVenuesExcept();
		console.log('vm.allothers: ' + vm.AllVenues);

		vm.loadMembers = function() {
			console.log('in load members');
			groupService.indexMembers()
			.then(function(res) {
				vm.members = res.data;
				console.log(vm.members);
			})
		};

		vm.updateRoute = function(route) {
			routeService.updateRoute(route)
			.then(function(res) {
				vm.loadRoute();
				vm.editRoute = null;
			})
			.catch(function(err) {
				console.log(err);
			})
		};

		vm.resetPage = function() {
			vm.loadRoute();
			vm.loadRouteVenues();
			vm.loadAllVenuesExcept(vm.route.id);
		}
		function CreateCordArray(){
			arr = [];
			vm.allVenues.forEach(function(val){
				var cord = {
					lng : val.address.longitude,
					lat : val.address.latitude,
					title : val.venue.name	
				};
				arr.push(cord);
			})
		}

	},
	controllerAs: 'vm'
});
