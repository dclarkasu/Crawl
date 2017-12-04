angular.module('authModule')
.component('login', {
	templateUrl: 'app/authModule/login.component.html',
	controller: function(authService, $location, $cookies, groupService, $rootScope){

		var vm = this;

		vm.login = function(user){
			console.log(user);
			authService.login(user)
			.then(function(res){
				groupService.indexUserGroups()
				.then(function(res) {
					$rootScope.$broadcast('getUserGroups', {
						message : "Got User Groups",
						groups : res.data
					})
				})
				$location.path('/user/' + $cookies.get('userId'));
			})
			.catch(function(err){
				console.log(err);
			});
		};
	},
	controllerAs: 'vm'
});
