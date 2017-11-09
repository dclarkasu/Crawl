angular.module('appModule')
.component('about',{
	templateUrl: 'app/appModule/about/about.component.html',
	controller: function($routeParams){
		
		var vm = this;
		
		vm.egg = null;
		
		if($routeParams.poem){
			vm.egg=true;
		}
	},
	controllerAs: 'vm'
});