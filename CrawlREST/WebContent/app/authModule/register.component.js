angular.module('authModule')
.component('register',{
	templateUrl: 'app/authModule/register.component.html',
	controller: function(authService, $location){

		var vm = this;

		vm.register = function(user){
			authService.register(user)
			.then(function(res){
				$location.path('/');
			})
			.catch(function(err){
				console.log(err);
			});
		}
	},
	controllerAs: 'vm'
});
