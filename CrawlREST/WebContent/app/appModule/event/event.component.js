angular.module('appModule').component('event', {
	templateUrl : "app/appModule/event/event.component.html",
	controller : function(eventService, $routeParams, groupService, $cookies) {
    var vm = this;

    vm.admin = null;
    vm.event = null;
    vm.newRoute = null;
    vm.members = [];
    vm.eventID = $routeParams.eid;
    vm.routes = [];

    //Behaviors
  
   vm.loadEvent = function() {
    		eventService.showEvent(vm.eventID)
    		.then(function(res) {
          console.log(res);
    			vm.event = res.data;
          console.log(vm.event);
          vm.loadMembers();
          vm.loadRoutes();
    		})
    };

    vm.loadEvent();

    vm.addRoute = function(newRoute) {
		eventService.addRouteToEvent(newRoute.id, $routeParams.eid)
		.then(function(res) {
			vm.loadEvent();
			vm.loadMembers();
			vm.newRoute = null;
		})
		.catch(function(err) {
			console.log(err);
		})
	};
	
	vm.createRoute = function(newRoute) {
		eventService.createRoute(newRoute)
		.then(function(res) {
			vm.loadEvent();
			vm.loadMembers();
			vm.newRoute = null;
		})
		.catch(function(err) {
			console.log(err);
		})
	};

    vm.setEditEvent = function() {
			vm.editEvent = angular.copy(vm.event);
		};

		vm.updateEvent = function(event) {
			eventService.updateEvent(vm.eventID, vm.event.group.id, event)
			.then(function(res) {
				vm.loadEvent();
				vm.editEvent = null;
			})
			.catch(function(err) {
				console.log(err);
			})
		};
	
	vm.loadMembers = function() {
			groupService.indexMembers(vm.event.group.id)
			.then(function(res) {
				vm.members = res.data;
			})
		};
		
	vm.adminCheck = function() {
		var promise = eventService.adminCheck($routeParams.eid, $cookies.get('userId'));
		promise.then(function(res){
			vm.admin = res.data;
		}).catch(function(err){
			console.log(err);
		});
	}
		
	vm.adminCheck();
	
	vm.setNewRoute = function() {
			vm.newRoute = {};
		};
		
	vm.loadRoutes = function() {
			eventService.indexRoutes()
			.then(function(res) {
				vm.routes = res.data;
			})
		};

  },
controllerAs: 'vm'
});
