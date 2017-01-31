var services = angular.module('services', []);

services.factory('dataServices', ['$http', function($http) {
	var d = {
		data: [],
		genres: []
	};

	d.getMovies = function(url) {
		$http.get(url).success(function(data) {
			angular.copy(data.results, d.data);

		});
	}

	d.getGenres = function() {
		$http.get("https://api.themoviedb.org/3/genre/movie/list?api_key=4980cd40e2331a9da1e3d5f49dba8ba7&language=en-US").success(function(data) {
			angular.copy(data.genres, d.genres);
		})
	}

	return d;
}]);
