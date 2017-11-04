angular.module('appModule').component('group', {
	templateUrl : "app/appModule/group/group.component.html",
	controller : function(groupService) {
		//Variables
		var vm = this;

		vm.group = null;

		vm.groupList = [];
		//Behaviors
		vm.groupsByUser = function() {
			groupService.indexUserGroups()
			.then(function(res){
				console.log(res.data);
				vm.groupList = res.data;
			})
		};

		vm.loadGroup = function() {
			groupService.showGroup()
			.then(function(res){
				console.log(res);
				vm.group = res.data;
			})
		}

		vm.loadGroup();
		console.log('vm.group: ' + vm.group);
	},
	controllerAs: 'vm'
});
