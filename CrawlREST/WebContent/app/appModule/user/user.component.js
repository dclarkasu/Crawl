angular.module('appModule').component('user', {
	templateUrl : 'app/appModule/user/user.component.html',
	controller : function(userService,$routeParams, $location, $scope) {


		// Variables
		var vm = this;

		vm.selected = null;
		vm.editUser = null;

		vm.groups = [];

		loadUser();
		// Behaviors

		//show user
		function loadUser(){
			userService.showUser($routeParams.uid)
			.then(function(res) {
				vm.findGroupByUserId();
				vm.selected = res.data;
			})
			.catch(function(err){
				console.log(err);
				$location.path('_404');
			})
		}

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


		// create new group
		vm.createGroup = function(newGroup) {
			var res = userService.createGroup(newGroup);

			res.then(function(res) {
			vm.groups = res.data;
			vm.findGroupByUserId();
			})
		}

	},

	controllerAs : 'vm'

})
