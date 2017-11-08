angular.module('appModule').component('event', {
	templateUrl : "app/appModule/event/event.component.html",
	controller : function(eventService, $routeParams, groupService) {
    var vm = this;

    vm.admin = null;
    
    vm.event = null;

    vm.members = [];

    vm.eventID = $routeParams.eid;

    vm.routes = [];

    //Behaviors
  
   
    vm.loadEvent = function() {
    		eventService.showEvent(vm.eventID)
    		.then(function(res) {
          console.log(res);
    			vm.event = res.data;
          console.log("Event:");
          console.log(vm.event);
          vm.loadMembers();
          console.log('members: ' + vm.members);
          vm.loadRoutes();
    		})
    };

    vm.loadEvent();
    console.log ("is this here:" + $routeParams.eid);
//    vm.adminCheck = function() {
//		var promise = groupService.adminCheck($routeParams.gid, $cookies.get('userId'));
//		
//		promise.then(function(res){
//			console.log(res);
//			console.log('in admin promise');
//			
//			vm.admin = res.data;
//		}).catch(function(err){
//			console.log(err);
//		});
//		
//	}
    
    // vm.loadGroup = function() {
		// 	groupService.showGroup()
		// 	.then(function(res){
		// 		vm.group = res.data;
		// 	}).catch(function(err){
		// 		console.log(err);
		// 	})
		// };
    //
    // vm.loadGroup():
    // console.log(vm.group);

    vm.setEditEvent = function() {
			vm.editEvent = angular.copy(vm.event);
		};

		vm.updateEvent = function(event) {
      console.log("event : ");
      console.log(event);
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
				console.log(vm.members);
			})
		};

    vm.setNewRoute = function() {
			vm.newRoute = {};
		};

		vm.addRoute = function(eid, newRoute) {
			console.log(newRoute);
			eventService.addRouteToEvent(eid, newRoute.id)
			.then(function(res) {
				// vm.loadRoutes();
				vm.loadEvent();
				vm.newRoute = null;
			})
			.catch(function(err) {
				console.log(err);
			})
		};

    vm.loadRoutes = function() {
			console.log('in load routes');
			eventService.indexRoutes()
			.then(function(res) {
				vm.routes = res.data;
				console.log(vm.routes);
			})
		};

  },
controllerAs: 'vm'
});
