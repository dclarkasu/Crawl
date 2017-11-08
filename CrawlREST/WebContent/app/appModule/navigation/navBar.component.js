angular.module('appModule')
.component('navBar',{
	templateUrl: 'app/appModule/navigation/navBar.component.html',
	controller: function($cookies, groupService, $scope, $log){

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

		vm.loadGroupsByUser();
		console.log(vm.groups);
		console.log('vm.groups after Call');

		//*********************************************************************************
		$scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

	},
	controllerAs: 'vm'
});
