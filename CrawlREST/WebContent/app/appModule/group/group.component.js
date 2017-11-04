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

		vm.printOut = function() {
			console.log("HELP!!!");
		}

		vm.loadGroup = function() {
			var promise = groupService.showGroup();
			promise.then(function(res){
				console.log(res);
				console.log('in promise');
				vm.group = res.data;
			}).catch(function(err){
				console.log(err);
			});
//			promise.then(vm.printOut());
		}
		vm.loadGroup();
		console.log('vm.group: ' + vm.group);
	},

	controllerAs: 'vm'
});
