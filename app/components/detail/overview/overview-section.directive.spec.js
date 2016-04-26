describe('Overview Section Directive Tests', function () {
    'use strict';

    var $scope, $compile, element, isolateScope;
    // This must be first, before providing the mock
    beforeEach(module('movieApp.movieDetail'));

    function getMovie() {

        return {
            "adult": false,
            "backdrop_path": "/hNFMawyNDWZKKHU4GYCBz1krsRM.jpg",
            "belongs_to_collection": null,
            "budget": 63000000,
            "genres": [
                {
                    "id": 18,
                    "name": "Drama"
                }
            ],
            "homepage": "",
            "id": 550,
            "imdb_id": "tt0137523",
            "original_language": "en",
            "original_title": "Fight Club",
            "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
            "popularity": 2.50307202280779,
            "poster_path": "/2lECpi35Hnbpa4y46JX0aY3AWTy.jpg",
            "production_companies": [
                {
                    "name": "20th Century Fox",
                    "id": 25
                },
                {
                    "name": "Fox 2000 Pictures",
                    "id": 711
                },
                {
                    "name": "Regency Enterprises",
                    "id": 508
                }
            ],
            "production_countries": [
                {
                    "iso_3166_1": "DE",
                    "name": "Germany"
                },
                {
                    "iso_3166_1": "US",
                    "name": "United States of America"
                }
            ],
            "release_date": "1999-10-14",
            "revenue": 100853753,
            "runtime": 139,
            "spoken_languages": [
                {
                    "iso_639_1": "en",
                    "name": "English"
                }
            ],
            "status": "Released",
            "tagline": "How much can you know about yourself if you've never been in a fight?",
            "title": "Fight Club",
            "video": false,
            "vote_average": 7.7,
            "vote_count": 3185
        };
    }

    // Load the HTML Template Cache
    beforeEach(module('templates'));

    beforeEach(inject(function ($rootScope, _$compile_) {
        $scope = $rootScope.$new();
        $compile = _$compile_;
        $scope.movie = getMovie();
    }));


    function compileDirective() {
        element = angular.element('<overview-section movie="movie"></overview-section-section>');
        $compile(element)($scope);
        $scope.$apply();
        isolateScope = element.isolateScope();
    }

    describe('Sanity Check', function () {

        it('isolate scope should be defined', function () {
            compileDirective();
            console.log("Element", element)
            expect(isolateScope).toBeDefined();
        });
    });

    describe('Overview Section Tests', function () {

        it('should render synopsis', function () {
            compileDirective();
            expect(element).toContainText('A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.');
        });

        it('should render 1 genre', function () {
            compileDirective();
            var genres = element.find('ul li');
            expect(genres.length).toEqual(1);
        });
        it('should render correct genre text', function () {
            compileDirective();
            var genre = element.find('ul li')[0];
            expect(genre).toHaveText('Drama');
        });
    });
});