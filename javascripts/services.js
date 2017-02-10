var services = angular.module('services', []);

services.factory('dataServices', ['$http', function($http) {
	var d = {
		data: [],
		genres: [],
		movie: {}
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

	d.getMovie = function(id) {
		$http.get("https://api.themoviedb.org/3/movie/" + id + "?api_key=4980cd40e2331a9da1e3d5f49dba8ba7&language=en-US").success(function(data) {
			var temp;
			angular.copy(data, d.movie);
		})
	}


	return d;
}]);

services.factory('data', [function() {
	var _base = "https://api.themoviedb.org/3/discover/movie?api_key=" + config.key + "&language=en-US&include_adult=true&include_video=false";
	var _sortByVote = "&sort_by=vote_average.desc";
	var _sortByPopularity = "&sort_by=popularity.desc";
	var _voteCountMin = "&vote_count.gte=200";
	var _genre = "&with_genres="; //number at end
	var _page = "&page="; //page number
	var _year = "&primary_release_year="; 

	var d = {
		url: _base + _page + 1
	};

	d.submit = function(page, year, orderBy, genre) {
		d.url = "";
		d.url += _base;
		if (page !== "") {
			d.url += _page + page;
		}
		if (year !== "") {
			d.url += _year + year;
		}
		if (orderBy === "rating") {
			d.url += _sortByVote + _voteCountMin;
		}
		else if (orderBy === "popularity") {
			d.url += _sortByPopularity;
		}
		if (genre !== "")
			d.url += _genre + genre;

	}

	d.updatePage = function(page) {
		var index = d.url.indexOf("&page=") + 6;
		var temp = d.url.substr(0, index) + page;
		if (index + 1 > d.url.length) {
			temp += d.url.substr(index + 1);
		}
		d.url = temp;
	}

	return d;
}]);