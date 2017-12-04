angular.module('authModule')
.component('register',{
	templateUrl: 'app/authModule/register.component.html',
	controller: function(authService, $location, $cookies){

		var vm = this;

		vm.register = function(user){
			authService.register(user)
			.then(function(res){
				$location.path('user/' + $cookies.get('userId'));
			})
			.catch(function(err){
				console.log(err);
			});
		}
	},
	controllerAs: 'vm'
});
