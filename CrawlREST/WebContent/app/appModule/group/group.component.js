angular.module('appModule').component('group', {
	templateUrl : "app/appModule/group/group.component.html",
	controller : function(groupService) {
		//Variables
		var vm = this;

		vm.group = null;

		vm.members = [];

		vm.events = [];

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
			var promise = groupService.showGroup();
			promise.then(function(res){
				console.log(res);
				console.log('in promise');
				vm.group = res.data;
			}).catch(function(err){
				console.log(err);
			});
		}

		vm.loadGroup();
		console.log('vm.group: ' + vm.group);

		vm.loadMembers = function() {
			console.log('in load members');
			groupService.indexMembers()
			.then(function(res) {
				vm.members = res.data;
				console.log(vm.members);
			})
		};

		vm.loadMembers();
		console.log('members: ' + vm.members);

		vm.setEditGroup = function() {
			vm.editGroup = angular.copy(vm.group);
		};

		vm.updateGroup = function(group) {
			groupService.updateGroup(group)
			.then(function(res) {
				vm.loadGroup();
				vm.editGroup = null;
			})
			.catch(function(err) {
				console.log(err);
			})
		};

		vm.setNewEvent = function() {
			vm.newEvent = {};
		};

		vm.addEvent = function(newEvent) {
			console.log(newEvent);
			groupService.createEvent(newEvent)
			.then(function(res) {
				vm.loadEvents();
				vm.loadGroup();
				vm.newEvent = null;
			})
			.catch(function(err) {
				console.log(err);
			})
		};

		vm.loadEvents = function() {
			groupService.indexEvents()
			.then(function(res) {
				console.log(res);
				vm.events = res.data;
			})
			.catch(function(err) {
				console.log(err);
			})
		};

		vm.loadEvents();
		console.log(vm.events);

	},
	controllerAs: 'vm'
});
