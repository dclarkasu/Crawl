angular.module('appModule').component('user', {
	templateUrl : 'app/appModule/user/user.component.html',
	controller : function(userService,$routeParams) {

		//, $filter, $location, $routeParams, $scope
		// $location.path('/about');

		// Variables
		var vm = this;

		vm.selected = null;
//
//		vm.editUser = null;

		vm.groups = [];

		
		// Behaviors
		var id = parseInt($routeParams)
			userService.showUser(id)
			.then(function(res) {
				vm.selected = res.data;
				if (!res.data) {
					$location.path('_404');
				}
			})
		

		// reloads user by group
		vm.findGroupByUserId = function() {
			userService.findGroupByUserId()
			.then(function(res) {
				vm.groups = res.data;
			})
		}

		vm.findGroupByUserId();

		// create new group
		vm.createGroup = function(newGroup) {
			newGroup.admin = 1;
			var res = userService.createGroup(newGroup);

			res.then(function(res) {
				console.log("then function of create Group")
				console.log(res.data);
//				vm.findGroupByUserId();
			})
		}


	},

	controllerAs : 'vm'

})