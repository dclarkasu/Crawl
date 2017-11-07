angular.module('appModule').component('event', {
	templateUrl : "app/appModule/event/event.component.html",
	controller : function(eventService, $routeParams) {
    var vm = this;
    
    vm.event = null;

    vm.eventID = $routeParams.eid;
    
    vm.loadEvent = function() {
    		eventService.showEvent(vm.eventID)
    		.then(function(res) {
    			vm.event = res.data;
    		})
    };
    
    vm.loadEvent();
  },
controllerAs: 'vm'
});
