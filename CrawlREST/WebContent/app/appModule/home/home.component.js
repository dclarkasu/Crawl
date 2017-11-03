angular.module('appModule')
.component('home',{
	templateUrl: 'app/appModule/home/home.component.html',
	controller: function(){
		
		var vm = this;
		
		vm.message = 'home works';
	},
	controllerAs: 'vm'
});