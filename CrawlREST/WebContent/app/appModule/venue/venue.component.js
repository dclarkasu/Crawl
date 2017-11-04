angular.module('appModule')
.component('venue',{
	templateUrl: 'app/appModule/venue/venue.component.html',
	controller: function(venueService, $routeParams){
		
		var vm = this;
		vm.venueList = [];
		vm.venue = null;
		load();
		loadVenue();
		function load(){
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