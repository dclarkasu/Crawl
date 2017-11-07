angular.module('appModule').component('group', {
	templateUrl : "app/appModule/group/group.component.html",
	controller : function(groupService, $routeParams) {
		//Variables
		var vm = this;
//		vm.userId = $cookies.get("userId")
				

		vm.group = null;

		vm.members = [];

		vm.events = [];

		vm.users = [];

		vm.groupList = [];

		vm.messageBoard = [];
		
		vm.newPost = null;
		
		//Behaviors
		vm.groupsByUser = function() {
			groupService.indexUserGroups()
			.then(function(res){
				console.log(res.data);
				vm.groupList = res.data;
			})
		};

		vm.loadGroup = function() {
			var promise = groupService.showGroup($routeParams.gid);
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
			groupService.indexMembers($routeParams.gid)
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
			groupService.createEvent(newEvent, $routeParams.gid)
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
			groupService.indexEvents($routeParams.gid)
			.then(function(res) {
				console.log(res);
				vm.events = res.data;
			})
			.catch(function(err) {
				console.log(err);
			})
		};
		
		vm.loadMessages = function() {
			groupService.indexGroupMessages($routeParams.gid)
			.then(function(res) {
				console.log(res);
				vm.messageBoard = res.data;
				console.log(vm.messageBoard);
			})
			.catch(function(err) {
				console.log(err);
			})
		};
		
		vm.addPost = function(gid, newPost) {
			console.log("1A");
			groupService.createPost(1, gid, newPost)
			.then(function(res){
				vm.loadMessages();
			})
		}

		vm.loadEvents();
		console.log(vm.events);

		vm.loadMessages();
		console.log("vm.message board: ");
	
		
		
		vm.deleteEvent = function(id) {
			groupService.deleteEvent($routeParams.gid, id )
			.then(function(res){
				vm.loadEvents();
				vm.loadGroup();
			})
		}

		vm.cancel = function() {
			vm.newEvent = null;
			vm.editGroup = null;
			vm.newMember = null;
			vm.memberToRemove = null;
		}

		vm.loadAllUsers = function() {
			groupService.indexUsers()
			.then(function(res){
				vm.users = res.data;
			}).catch(function(err){
				console.log(err);
			});
		}

		vm.loadAllUsers();

		vm.setNewMember = function() {
			vm.newMember = {};
		};

		vm.addMember = function(gid, user) {
			console.log(user);
			groupService.addUserToGroup(gid, user.id)
			.then(function(res){
				vm.loadGroup();
				vm.loadAllUsers();
				vm.loadMembers();
				vm.newMember = null;
			})
		}

		vm.setRemoveMember = function() {
			vm.memberToRemove = {};
		};

		vm.removeMember = function(gid, user) {
			console.log(user);
			groupService.removeUserFromGroup(gid, user.id)
			.then(function(res){
				vm.loadGroup();
				vm.loadAllUsers();
				vm.loadMembers();
				vm.memberToRemove = null;
			})
		}

	},
	controllerAs: 'vm'
});
