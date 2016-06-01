(function () {

    angular.module('movieApp')
        .config(function ($stateProvider, $urlRouterProvider) {


            $urlRouterProvider.otherwise("/upcoming");

            $stateProvider.state('details', {
                url:  '/details/:movieId',
                templateUrl: 'app/components/detail/movie-detail.html',
                controller: 'DetailCtrl as movie'
            })
            .state('list', {
                url:  '/search/:movieName',
                templateUrl: 'app/components/list/movie-list.html',
                controller: 'ListCtrl as movieList'
            }).state('favorites', {
                url: '/favorites',
                templateUrl: 'app/components/list/movie-list.html',
                controller: 'FavoritesController as movieList'
            }).state('now-playing', {
                url: '/now-playing',
                templateUrl: 'app/components/list/movie-list.html',
                controller: 'NowPlayingController as movieList'
            }).state('top-rated', {
                url: '/top-rated',
                templateUrl: 'app/components/list/movie-list.html',
                controller: 'TopRatedController as movieList'
            }).state('upcoming', {
                url: '/upcoming',
                templateUrl: 'app/components/list/movie-list.html',
                controller: 'UpcomingController as movieList'
            });
        });
})();