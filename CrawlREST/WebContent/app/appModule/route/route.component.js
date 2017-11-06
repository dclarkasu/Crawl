angular.module('appModule').component('route', {
	templateUrl : "app/appModule/route/route.component.html",
	controller : function(routeService) {
		//Variables
		var vm = this;

		vm.route = null;

		//Behaviors
		vm.groupsByUser = function() {
			groupService.indexUserGroups()
			.then(function(res){
				console.log(res.data);
				vm.groupList = res.data;
			})
		};

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

		vm.loadRoute();
		console.log('vm.route: ' + vm.route);

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

	},
	controllerAs: 'vm'
});