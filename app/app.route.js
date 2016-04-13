(function () {

    angular.module('movieApp')
        .config(function ($stateProvider, $urlRouterProvider) {


            $urlRouterProvider.otherwise("/main");

            $stateProvider.state('details', {
                url:  '/details/:movieId',
                templateUrl: 'components/detail/movie-detail.html',
                controller: 'DetailCtrl as movie'
            })
            .state('list', {
                url:  '/search/:movieName',
                templateUrl: 'components/list/movie-list.html',
                controller: 'ListCtrl as movieList'
            }).state('favorites', {
                url: '/favorites',
                templateUrl: 'components/list/movie-list.html',
                controller: 'FavoritesCtrl as movieList'
            }).state('now-playing', {
                url: '/now-playing',
                templateUrl: 'components/list/movie-list.html',
                controller: 'NowPlayingCtrl as movieList'
            }).state('top-rated', {
                url: '/top-rated',
                templateUrl: 'components/list/movie-list.html',
                controller: 'TopRatedCtrl as movieList'
            }).state('main', {
                url: '/',
                templateUrl: 'components/search/movie-search.html',
                controller: 'SearchCtrl'
            });

        })
})();