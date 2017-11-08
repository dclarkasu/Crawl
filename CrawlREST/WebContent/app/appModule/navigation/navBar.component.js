angular.module('appModule')
.component('navBar',{
	templateUrl: 'app/appModule/navigation/navBar.component.html',
	controller: function($cookies, groupService){

		var vm = this;

		vm.groups = [];

		//Behaviors
		vm.getUserId = function(){
			return $cookies.get('userId');
		};

		vm.isLoggedIn = function(){
			if($cookies.get('userId')){
				return true
			}
			return false;
		};

		vm.loadGroupsByUser = function() {
			groupService.indexUserGroups()
			.then(function(res) {
				vm.groups = res.data;
				console.log(vm.groups);
				console.log('vm.groups in load');
			})
		};

		vm.loadGroupsByUser();
		console.log(vm.groups);
		console.log('vm.groups after Call');


	},
	controllerAs: 'vm'
});
