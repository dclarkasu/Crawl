angular.module('appModule')
.component('about',{
	templateUrl: 'app/appModule/about/about.component.html',
	controller: function(){
		
		var vm = this;
		
		vm.message = 'about works';
	},
	controllerAs: 'vm'
});