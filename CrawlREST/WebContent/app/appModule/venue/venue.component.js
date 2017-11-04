angular.module('appModule')
.component('venue',{
	templateUrl: 'app/appModule/venue/venue.component.html',
	controller: function(venueService){
		
		var vm = this;
		vm.venueList = [];
		
		load();
		
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