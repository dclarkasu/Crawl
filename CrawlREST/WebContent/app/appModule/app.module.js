angular.module('appModule', ['ngRoute','ngCookies','authModule'])
.config(function($routeProvider){
	$routeProvider
	.when('/',{
		template: '<home></home>'
	})
	.when('/about',{
		template: '<about></about>'
	})
	.when('/login', {
		template : `
		<login></login>
	`
	})
	.when('/register', {
		template : `
		<register></register>
	`
	})
	.when('/user', {
		template : `
			<user></user>
			`
	})
	.when('/venue/:vid', {
		template: '<venue></venue>'
	})
});
