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

		vm.groups = null;

		var id = parseInt($routeParams)
			userService.showUser(id)
			.then(function(res) {
				vm.selected = res.data;
				if (!res.data) {
					$location.path('_404');
				}
			})
		


		// Behaviors

		// reloads user by group
		vm.findGroupByUserId = function() {
			userService.findGroupByUserId()
			.then(function(res) {
				vm.groups = res.data;
			})
		}

		vm.findGroupByUserId();


		// adds total length
//		vm.getNumOfTasks = function() {
//			return $filter("incomplete")(vm.todos).length;
//		}
//
//		vm.warnUser = function() {
//			if (vm.getNumOfTasks() >= 10)
//				return 'danger';
//			else if (vm.getNumOfTasks() >= 5)
//				return 'warning';
//			else
//				return 'safe';
//		}
//
//		// create
//		vm.addTask = function(newTask) {
//			newTask.completed = false;
//			newTask.description = '';
//
//			var res = todoService.create(newTask);
//
//			res.then(function(res) {
//				// have this $scope listen for the 'newMessage' event and then call a callback function
//			    $scope.$on('todoCreated', function(e,data){
//			    console.log(data.todo);
//			    })
//				vm.reload();
//			})
//		}
//
//		// complete
//		vm.completeTodo = function(todo, date) {
//			var completed = todo.completed == false ? true : false;
//			todo.completed = completed;
//			if (todo.completed === true) {
//				todo.completeDate = date;
//			} else {
//				todo.completeDate = "";
//			}
//			return todo;
//		}
//
//		//
//		vm.selectTodo = function(todo) {
//			console.log(todo);
//			vm.selected = todo;
//		};
//
//		//
//		vm.displayTable = function() {
//			vm.selected = null;
//		};
//
//		//
//		vm.setEditTodo = function(todo) {
//			vm.editTodo = angular.copy(vm.selected);
//
//		};
//
//		// Update
//		vm.updateTodo = function(todo) {
//			todo = vm.completeTodo(todo, date);
//			console.log(todo);
//			var res = todoService.update(todo);
//
//			res.then(function(res) {
//				vm.selected = res.data;
//				vm.editTodo = null;
//				vm.reload();
//			})
//
//		}
//
//		// Delete
//		vm.deleteTodo = function(uid, tid) {
//			var res = todoService.destroy(uid, tid);
//
//			res.then(function(res) {
//				vm.reload();
//			})
//		}

	},

	controllerAs : 'vm'

})