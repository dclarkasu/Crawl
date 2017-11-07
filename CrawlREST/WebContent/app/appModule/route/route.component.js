angular.module('appModule').component('route', {
	templateUrl : "app/appModule/route/route.component.html",
	controller : function(routeService) {
		//Variables
		var vm = this;

		vm.route = null;
		vm.routeVenues = null;
		vm.allVenues = null;


		vm.loadRoute = function() {
			var promise = routeService.showRoute();
			
			promise.then(function(res){
				console.log(res);
				console.log('in promise');
				
				vm.route = res.data;
			
			}).catch(function(err){
				console.log(err);
			});
		}
	
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
			})
		};
		
	
		vm.loadAllVenues = function (){
			console.log('in Load All Venues');
			routeService.indexAllVenues().then(function(res){
				vm.allVenues = res.data;
				console.log(vm.allVenues);
			})
		};
		
		
		vm.loadRoute();
		console.log('vm.route: ' + vm.route);
		vm.loadRouteVenues();
		console.log('vm.routeVenues: ' + vm.routeVenues);

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
			vm.loadAllVenues();
		}

	},
	controllerAs: 'vm'
});

