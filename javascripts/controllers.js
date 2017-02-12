var controllers = angular.module('controllers', []);

controllers.controller('MainCtrl', ['$scope', 'dataServices', 'url', '$stateParams', '$state', function($scope, dataServices, url, $stateParams, $state) {
	$scope.baseImageURL = "https://image.tmdb.org/t/p/";
	$scope.imageSize = "w500";

	$scope.page = parseInt($stateParams.page);
	$scope.url = url.url;
	$scope.movies = dataServices.data;
	$scope.genres = dataServices.genres;

	$scope.genre = dataServices.genre;
	$scope.year = dataServices.year;
	$scope.orderBy = dataServices.orderBy;

	$scope.pagelist = [];

	$scope.submit = function() {
		url.submit($scope.page, $scope.year, $scope.orderBy, $scope.genre);
		$scope.url = url.url;
		dataServices.getMovies($scope.url);
		dataServices.orderBy = $scope.orderBy;
		dataServices.genre = $scope.genre;
		dataServices.year = $scope.year;
	};


	$scope.years = [];
	for (i = 2017; i >= 1900; i--) {
		$scope.years.push(i);
	}

	$scope.genreIdsToGenres = function(ids) {
		var str = "";
		for (var i = 0; i < ids.length; i++) {
			str += idToGenre(ids[i]);
			if (i !== ids.length - 1) str += ', ';
		}
		return str;
	}

	idToGenre = function(id) {
		for (var i = 0; i < $scope.genres.length; i++) {
			if (id === $scope.genres[i].id) return $scope.genres[i].name;
		}
	}

	$scope.nextPage = function() {
		$scope.page++;
		//data.submit($scope.page, $scope.year, $scope.orderBy, $scope.genre);
		window.location.href="#/home/" + $scope.page;
	}

	$scope.prevPage = function() {
		if ($scope.page <= 1) {
			return;
		}
		$scope.page--;
		window.location.href="#/home/" + $scope.page;
	}

	$scope.getPagelist = function() {
		var start = $scope.page - 2;
		if (start <= 0) {
			start = 1;
		}
		for (var i = start; i < start + 5; i++) {
			$scope.pagelist.push(i);
		}
	}
	$scope.getPagelist();
	
}]);

controllers.controller('DetailsCtrl', ['$scope', '$stateParams', 'dataServices', function($scope, $stateParams, dataServices) {
	$scope.cast = dataServices.cast;
	$scope.movie = dataServices.movie;

	$scope.imageBaseUrl = "https://image.tmdb.org/t/p/";
	$scope.imageSize = "w600";

	$scope.getTopActors = function() {
		var topActors = $scope.cast.cast.slice(0, 6);
		var str = "";
		for (i = 0; i < topActors.length; i++) {
			str += topActors[i].name;
			if (i != topActors.length - 1) str += ", ";
		}
		$scope.topActors = str;
	}

	$scope.getDirectors = function() {
		var str = ""
		var arr = $scope.cast.crew;
		for (i = 0; i < arr.length; i++) {
			if (arr[i].job === "Director") {
				str += arr[i].name + ", ";
			}
		}
		var temp = str.substring(0, str.length - 2);
		$scope.directors = str;
	}

	$scope.getTopActors();
	$scope.getDirectors();

}]);