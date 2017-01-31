var app = angular.module('watchit', ['ui.router', 'controllers', 'services']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'partials/home.html',
		controller: 'MainCtrl'
	});

	$urlRouterProvider.otherwise('home');
}]);