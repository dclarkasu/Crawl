angular.module('appModule').component('group', {
	templateUrl : "app/appModule/group/group.component.html",
	controller : function(groupService, $routeParams, $cookies, $location) {
		// Variables
		var vm = this;
// vm.userId = $cookies.get("userId")

		vm.admin = null;

		vm.group = null;

		vm.members = [];

		vm.activeUserId = null;

		vm.events = [];

		vm.users = [];

		vm.groupList = [];

		vm.messageBoard = [];

		vm.newPost = null;

		// Behaviors
		vm.groupsByUser = function() {
			groupService.indexUserGroups()
			.then(function(res){
				console.log(res.data);
				vm.groupList = res.data;
			})
		};

		vm.findActiveUserId = function(){
			vm.activeUserId = $cookies.get('userId');
		}


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
		vm.findActiveUserId();
		console.log('vm.activeUserId: ' + vm.activeUserId);

		vm.adminCheck = function() {
			var promise = groupService.adminCheck($routeParams.gid, $cookies.get('userId'));

			promise.then(function(res){
				console.log(res);
				console.log('in admin promise');

				vm.admin = res.data;
			}).catch(function(err){
				console.log(err);
			});

		}

		vm.adminCheck();
		console.log('vm.check: ' + vm.admin);

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
			console.log("Group: ");
			console.log(group);
			console.log("group id in component: " + vm.group.id);
			groupService.updateGroup(group, vm.group.id)
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

		vm.setNewPost = function() {
			vm.newPost = null;
		};

		vm.addEvent = function(newEvent) {
			groupService.createEvent(newEvent, $routeParams.gid, vm.activeUserId)
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
			})
			.catch(function(err) {
				console.log(err);
			})
		};

		vm.addPost = function(gid, newPost) {
			groupService.createPost(vm.activeUserId, gid, newPost)
			.then(function(res){
				vm.loadMessages();
				vm.setNewPost();
			})
		}

		vm.removePost = function(pid) {

			groupService.deletePost(vm.activeUserId, pid)
			.then(function(res){
				vm.loadMessages();
			})
		}

		vm.loadEvents();
		vm.loadMessages();

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
			groupService.addUserToGroup(gid, user.id)
			.then(function(res){
				vm.loadGroup();
				vm.loadAllUsers();
				vm.loadMembers();
				vm.newMember = null;
			})
		}

		vm.rem

		vm.setRemoveMember = function() {
			vm.memberToRemove = {};
		};

		vm.removeMember = function(gid, user) {
			groupService.removeUserFromGroup(gid, user.id)
			.then(function(res){
				vm.loadGroup();
				vm.loadAllUsers();
				vm.loadMembers();
				vm.memberToRemove = null;
			})
		};

		vm.deleteGroup = function(id) {
			var choice = window.confirm("Are you sure?");
			if (choice) {
				groupService.deleteGroup(id)
				.then(function(res) {
					// vm.loadGroup();
					// vm.loadAllUsers();
					// vm.loadMembers();
					$location.path('user/'+vm.admin.id);
				})
				.catch(function(err) {
					console.log(err);
				})
			} else {
				console.log("Not deleted");
			}
		}

		console.log('ADMIN: ' + vm.admin);
	},
	controllerAs: 'vm'
});
