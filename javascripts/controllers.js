var controllers = angular.module('controllers', []);

controllers.controller('MainCtrl', ['$scope', 'dataServices', function($scope, dataServices) {
	$scope.baseImageURL = "http://image.tmdb.org/t/p/";
	$scope.imageSize = "w500";

	$scope._base = "https://api.themoviedb.org/3/discover/movie?api_key=" + config.key + "&language=en-US&include_adult=true&include_video=false";
	$scope._sortByVote = "&sort_by=vote_average.desc";
	$scope._sortByPopularity = "&sort_by=popularity.desc";
	$scope._voteCountMin = "&vote_count.gte=200";
	$scope._genre = "&with_genres="; //number at end
	$scope._page = "&page="; //page number
	$scope._year = "&primary_release_year="; 


	dataServices.getMovies($scope._base + $scope._page + 1);
	dataServices.getGenres();

	$scope.movies = dataServices.data;
	$scope.genres = dataServices.genres;
	$scope.years = [];
	for (i = 2017; i >= 1900; i--) {
		$scope.years.push(i);
	}

	$scope.genre = "";
	$scope.year = "";
	$scope.orderBy = "";
	
	$scope.submit = function() {
		$scope.url = $scope._base  + $scope._page + 1;
		if ($scope.year !== "")
			$scope.url += $scope._year + $scope.year;
		if ($scope.orderBy === "rating")
			$scope.url += $scope._sortByVote + $scope._voteCountMin;
		else if ($scope.orderBy === "popularity")
			$scope.url += $scope._sortByPopularity;
		if ($scope.genre !== "")
			$scope.url += $scope._genre + $scope.genre;

		dataServices.getMovies($scope.url);

	}
}]);