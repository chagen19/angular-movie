(function () {
    'use strict';

    function detailCtrl($rootScope, $scope, $timeout, $routeParams, theMovieDBService) {

        $scope.movieId = $routeParams.movieId
        $rootScope.movieId = $scope.movieId;
        theMovieDBService.getMovieDetails($scope.movieId).success(function (data) {
            $scope.movie = data;
        });

        $scope.reInitIso = function () {
            <!-- Fix to delay isotop until images are loaded -->
            $timeout(function () {
                console.log('Re-initiating isotope');
                $scope.$broadcast('isotope.onLayout');
            }, 700);
        };
    }

    function posterSection() {
        return {
            restrict: 'E',
            templateUrl: 'views/components/poster-section.html'
        }
    }

    function overviewSection() {
        return {
            restrict: 'E',
            templateUrl: 'views/components/overview-section.html'
        }
    }

    function trailerSection($sce, theMovieDBService) {

        return {
            restrict: 'E',
            scope: {
                movieId: "@"
            },
            templateUrl: 'views/components/trailers-section.html',
            controller: function ($scope, $element, $attrs) {
                theMovieDBService.getVideos($scope.movieId).success(function (data) {
                    $scope.trailers  = data.results.filter(function(video) {
                        return video.site == "YouTube" && video.key != null
                    });
                    $scope.setTrailer(0);
                });

            },
            link: function (scope, element, attrs) {
                scope.setTrailer = function (index) {
                    var trailer = scope.trailers[index];
                    if (null != trailer || null) {
                        console.log("Setting trailer to index " + index);
                        scope.yturl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + trailer.key + "?enablejsapi=0");
                        scope.trailer = trailer;
                    }
                }
            }
        };
    }

    function castSection($rootScope, theMovieDBService) {
        return {
            restrict: 'E',
            scope: {
                movieId: '@'
            },
            templateUrl: 'views/components/cast-section.html',
            controller: function ($scope, $element, $attrs) {
                console.log("MovieId IS" + $scope.movieId);
                $scope.url = $rootScope.url;
                theMovieDBService.getCredits($scope.movieId).success(function (data) {
                    $scope.cast = data.cast;
                    $scope.maxDisplay = 18;
                    $scope.total = (data.cast.length > $scope.maxDisplay) ? $scope.maxDisplay : data.cast.length;
                });
            }
        }
    }

    function similarSection($rootScope, theMovieDBService) {

        return {
            restrict: 'E',
            scope: {
                movieId: '@',
                goTo: '&go',
                favorites: '='
            },
            templateUrl: 'views/movie-list.html',
            controller: function ($scope, $element, $attrs) {
                $scope.url = $rootScope.url;
                theMovieDBService.getSimilarMovies($scope.movieId).success(function (data) {
                    $scope.total = data.results.length;
                    $scope.total_results = data.total_results;
                    $scope.results = data.results;
                });
            },
            link: function(scope, element, attrs) {
                scope.go = function(value) {
                    // Need to pass an object that matches to the parameter name of passed in mathod
                    scope.goTo({path: value});
                };
            }
        };
    }

    angular.module('movieApp.movieDetail', [
        'ngRoute',
        'movieApp.movieDetail.controllers',
        'movieApp.common.directives'
    ]);

    angular.module('movieApp.movieDetail.controllers', [
        'movieApp.movieDetail.directives',
        'movieApp.theMovieDB.services',
        'ngAnimate'
    ]).controller('DetailCtrl', detailCtrl);

    angular.module('movieApp.movieDetail.directives', [])
        .directive('posterSection', posterSection)
        .directive('overviewSection', overviewSection)
        .directive('trailersSection', trailerSection)
        .directive('castSection', castSection)
        .directive('similarSection', similarSection);
})();