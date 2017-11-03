angular.module('appModule')
.component('navBar',{
	templateUrl: 'app/appModule/navigation/navBar.component.html',
	controller: function(){
		
		var vm = this;
		
		vm.message = 'this is the nav bar';
	},
	controllerAs: 'vm' 
});