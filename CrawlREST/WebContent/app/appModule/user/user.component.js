angular.module('appModule').component('user', {
	templateUrl : 'app/appModule/user/user.component.html',
	controller : function(userService,$routeParams) {

		//, $filter, $location, $routeParams, $scope
		// $location.path('/about');

		// Variables
		var vm = this;

		vm.selected = null;

		vm.editUser = null;
		

		vm.groups = [];

		
		// Behaviors
		
		//show user
		var id = parseInt($routeParams)
			userService.showUser(id)
			.then(function(res) {
				vm.selected = res.data;
				if (!res.data) {
					$location.path('_404');
				}
			})
			
		//update user
		vm.updateUser = function() {
			console.log(vm.editUser);
		var res = userService.updateUser(vm.editUser);
		
		res.then(function(res) {
			
			vm.selected = res.data;
			vm.editUser = null;
		
			
		})
		
	}
		
	
		
		//Copy info over to edit form
		vm.setEditUser = function(user) {
			vm.editUser = angular.copy(vm.selected);
			
		};
		vm.setEditContact = function(contact) {
			vm.editContact = angular.copy(vm.selected);
			
		};
			

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
			var res = userService.createGroup(newGroup);

			res.then(function(res) {
			vm.groups = res.data;
			})
		}
		

	},

	controllerAs : 'vm'

})