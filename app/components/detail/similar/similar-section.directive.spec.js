describe('Similar Section Directive Tests', function () {
    'use strict';

    var $scope, $compile, element, mockMovieSvc, passPromise, isolateScope;
    var url = "http://images/";
    var movieId = '123';
    // This must be first, before providing the mock
    beforeEach(module('movieApp.movieDetail'));

    // Provide Mock for TheMovieDBService
    beforeEach(module(function ($provide) {
        $provide.factory('TheMovieDBService', ['$q', function ($q) {
            function getSimilarMovies(movieId) {
                if (passPromise) {
                    return $q.when({
                        "page": 1,
                        "results": [
                            {
                                "adult": false,
                                "backdrop_path": "/99qMHgawGX9QWx6zllecsMbbLkj.jpg",
                                "id": 17169,
                                "original_title": "Any Which Way You Can",
                                "release_date": "1980-12-17",
                                "poster_path": "/fcwYEVdBa251yqeuTfFQXHlMrHt.jpg",
                                "popularity": 0.612450827242979,
                                "title": "Any Which Way You Can",
                                "vote_average": 6.6,
                                "vote_count": 9
                            },
                            {
                                "adult": false,
                                "backdrop_path": "/5X0l0G0S95iTzJMptyIMZO80XNS.jpg",
                                "id": 54833,
                                "original_title": "The Big Man",
                                "release_date": "1991-08-09",
                                "poster_path": "/v2RAbH8HJuLdMYnwC9RAFx08aeU.jpg",
                                "popularity": 0.69152162618085,
                                "title": "The Big Man",
                                "vote_average": 0,
                                "vote_count": 0
                            },
                            {
                                "adult": false,
                                "backdrop_path": "/Ai8pP8nbpUBAMbAcQ6EnVepReKF.jpg",
                                "id": 43522,
                                "original_title": "Gentleman Jim",
                                "release_date": "1942-11-14",
                                "poster_path": "/nS7UHGfViBWZw6SDtYDeVLAYVgX.jpg",
                                "popularity": 0.46,
                                "title": "Gentleman Jim",
                                "vote_average": 0,
                                "vote_count": 0
                            },
                            {
                                "adult": false,
                                "backdrop_path": "/m4YwE8eChe6X57VgFmVFKCu5ObZ.jpg",
                                "id": 9103,
                                "original_title": "The Quest",
                                "release_date": "1996-04-19",
                                "poster_path": "/nQgMrXHYPAxVTYgnbhRGyCLcbHV.jpg",
                                "popularity": 0.92391,
                                "title": "The Quest",
                                "vote_average": 5.1,
                                "vote_count": 8
                            },
                            {
                                "adult": false,
                                "backdrop_path": "/ac966FhrHvPAgCn2Id3uf1OegCT.jpg",
                                "id": 21001,
                                "original_title": "Like It Is",
                                "release_date": "1998-04-17",
                                "poster_path": "/bMw3TUvXSd4ZijcOaDdqZBCmgcM.jpg",
                                "popularity": 0.437,
                                "title": "Like It Is",
                                "vote_average": 4,
                                "vote_count": 1
                            }
                        ],
                        "total_pages": 2271,
                        "total_results": 5
                    });
                } else {
                    return $q.reject();
                }
            }

            return {
                getSimilarMovies: getSimilarMovies
            };
        }]);
    }));

    // Load the HTML Template Cache
    beforeEach(module('templates'));

    beforeEach(inject(function ($rootScope, _$compile_, _TheMovieDBService_) {
        $scope = $rootScope.$new();
        $compile = _$compile_;
        $rootScope.url = url;
        $scope.movieId = movieId;
        mockMovieSvc = _TheMovieDBService_;
        passPromise = true;
    }));


    function compileDirective() {
        element = angular.element('<similar-section movie-id="{{movieId}}"></similar-section>');
        $compile(element)($scope);
        $scope.$apply();
        isolateScope = element.isolateScope();
    }

    describe('Sanity Check', function () {

        it('isolate scope should be defined', function () {
            compileDirective();
            expect(isolateScope).toBeDefined();
        });
        it('mockMovieSvc should be defined', function () {
            compileDirective();
            expect(mockMovieSvc).toBeDefined();
        });
    });

    describe('Similar Section Tests', function () {

        it('should call getSimilarMovies', function () {
            spyOn(mockMovieSvc, 'getSimilarMovies').and.callThrough();
            compileDirective();
            expect(mockMovieSvc.getSimilarMovies).toHaveBeenCalledWith(movieId);
        });
        it('should set movies when successfully retrieved', function () {
            spyOn(mockMovieSvc, 'getSimilarMovies').and.callThrough();
            compileDirective();
            expect(isolateScope.movieList.results).toBeDefined();
        });
        it('should not set movies when not successfully retrieved', function () {
            spyOn(mockMovieSvc, 'getSimilarMovies').and.callThrough();
            passPromise = false;
            compileDirective();
            expect(isolateScope.movieList.results).not.toBeDefined();
        });

        it('should have a total of 5 movies', function () {
            spyOn(mockMovieSvc, 'getSimilarMovies').and.callThrough();
            compileDirective();
            expect(isolateScope.movieList.results.length).toBe(5);
        });

        it('should render 5 movies', function () {
            spyOn(mockMovieSvc, 'getSimilarMovies').and.callThrough();
            compileDirective();
            console.log(element);
            var slides = element.find('movie-card');
            expect(slides.length).toBe(5);
        });

        it('should use url for images', function () {
            spyOn(mockMovieSvc, 'getSimilarMovies').and.callThrough();
            compileDirective();
            var movieCard = element.find('movie-card')[0];
            expect(movieCard).toHaveAttr("url", url);
        });

    });
});