var app = angular.module('watchit', ['ui.router', 'controllers', 'services']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home', {
		url: '/home/:page',
		templateUrl: 'partials/home.html',
		controller: 'MainCtrl',
		resolve: {
			moviesPromise: ['dataServices', 'url', '$stateParams', function(dataServices, url, $stateParams) {
				dataServices.getGenres();
				url.updatePage($stateParams.page);
				return dataServices.getMovies(url.url);
			}]
		}
	}).
	state('movie', {
		url: '/movie/:id',
		templateUrl: 'partials/details.html',
		controller: 'DetailsCtrl',
		resolve: {
			moviePromise: ['dataServices', '$stateParams', function(dataServices, $stateParams) {
				return dataServices.getMovie($stateParams.id);
			}]
		}
	});

	$urlRouterProvider.otherwise('/home/1');
}]);