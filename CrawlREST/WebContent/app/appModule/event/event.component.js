angular.module('appModule').component('event', {
	templateUrl : "app/appModule/event/event.component.html",
	controller : function(eventService, $routeParams, groupService) {
    var vm = this;

    vm.event = null;

    vm.group = null;

    vm.route = null;

    vm.members = [];

    vm.eventID = $routeParams.eid;

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
    		})
    };

    vm.loadEvent();

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
			groupService.updateEvent(event.id, event)
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

  },
controllerAs: 'vm'
});
