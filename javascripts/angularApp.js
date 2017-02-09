var app = angular.module('watchit', ['ui.router', 'controllers', 'services']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home', {
		url: '/home/:page',
		templateUrl: 'partials/home.html',
		controller: 'MainCtrl'
	}).
	state('movie', {
		url: '/movie/:id',
		templateUrl: 'partials/details.html',
		controller: 'DetailsCtrl'
	});

	$urlRouterProvider.otherwise('/home/1');
}]);