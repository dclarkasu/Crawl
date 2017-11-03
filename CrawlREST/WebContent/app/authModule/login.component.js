angular.module('authModule')
.component('login', {
	templateUrl: 'app/authModule/login.component.html',
	controller: function(authService, $location){

		var vm = this;

		vm.login = function(user){
			authService.login(user)
			.then(function(res){
				$location.path('/');
			})
			.catch(function(err){
				console.log(err);
			});
		};
	},
	controllerAs: 'vm'
});
