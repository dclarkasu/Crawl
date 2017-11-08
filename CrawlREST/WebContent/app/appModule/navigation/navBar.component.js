angular.module('appModule')
.component('navBar',{
	templateUrl: 'app/appModule/navigation/navBar.component.html',
	controller: function($cookies, groupService, $scope){

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

		$scope.$on('createdGroup', function(ev, data) {
			console.log(ev);
			console.log(data);
			console.log("In navBar js");
			vm.loadGroupsByUser();
		})

	},
	controllerAs: 'vm'
});
