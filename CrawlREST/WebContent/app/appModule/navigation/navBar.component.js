angular.module('appModule')
.component('navBar',{
	templateUrl: 'app/appModule/navigation/navBar.component.html',
	controller: function($cookies){
		
		var vm = this;
		vm.userId = $cookies.get('userId');
		vm.isLoggedIn = function(){
			if($cookies.get('userId')){
				return true
			}
			return false;
		}
	},
	controllerAs: 'vm' 
});