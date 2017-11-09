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
			})
		};

		vm.loadGroupsByUser();
		
		$scope.$on('createdGroup', function(ev, data) {
			vm.loadGroupsByUser();
		})

		$scope.$on('getUserGroups', function(ev, data) {
			vm.groups = data.groups;
		})

		$scope.$on('updatedGroup', function(ev, data) {
			vm.groups.forEach(function(val, idx, arr) {
				if (val.id === data.group.id) {
					console.log("FOUND");
					arr[idx] = data.group;
				}
			})
		})

		$scope.$on('deleteGroup', function(ev, data) {
			vm.groups.forEach(function(val, idx, arr) {
				if (val.id === data.groupID) {
					arr.splice(idx, 1);
				}
			})
		})

	},
	controllerAs: 'vm'
});
