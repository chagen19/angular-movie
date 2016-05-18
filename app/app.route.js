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
                controller: 'FavoritesController as movieList'
            }).state('now-playing', {
                url: '/now-playing',
                templateUrl: 'components/list/movie-list.html',
                controller: 'NowPlayingController as movieList'
            }).state('top-rated', {
                url: '/top-rated',
                templateUrl: 'components/list/movie-list.html',
                controller: 'TopRatedController as movieList'
            }).state('main', {
                url: '/',
                templateUrl: 'components/search/movie-search.html',
                controller: 'SearchController as search'
            });

        })
})();