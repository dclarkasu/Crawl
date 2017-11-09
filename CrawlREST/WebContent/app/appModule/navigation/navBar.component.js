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

		$scope.$on('getUserGroups', function(ev, data) {
			console.log(ev);
			console.log(data.groups);
			vm.groups = data.groups;
		})

		$scope.$on('updatedGroup', function(ev, data) {
			console.log(ev);
			console.log(data);
			vm.groups.forEach(function(val, idx, arr) {
				if (val.id === data.group.id) {
					console.log("FOUND");
					arr[idx] = data.group;
				}
			})
			console.log(vm.groups)
			// $scope.$apply();
		})

		$scope.$on('deleteGroup', function(ev, data) {
			console.log(ev);
			console.log(data);
			vm.groups.forEach(function(val, idx, arr) {
				if (val.id === data.groupID) {
					arr.splice(idx, 1);
				}
			})
			console.log("Groups after delete: ");
			console.log(vm.groups)
		})

	},
	controllerAs: 'vm'
});
