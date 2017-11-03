angular.module('appModule', ['ngRoute','ngCookies','authModule'])
.config(function($routeProvider){
	$routeProvider
	.when('/',{
		template: '<home></home>'
	})
});