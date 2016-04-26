describe('Cast Section Directive Tests', function () {
    'use strict';

    var $scope, $compile, element, mockMovieSvc, passPromise, isolateScope;
    var url = "http://images/";
    var movieId = '123';
    // This must be first, before providing the mock
    beforeEach(module('movieApp.movieDetail'));

    // Provide Mock for theMovieDBService
    beforeEach(module(function ($provide) {
        $provide.factory('theMovieDBService', ['$q', function ($q) {
            function getCredits(movieId) {
                if (passPromise) {
                    return $q.when({
                        "id": 550,
                        "cast": [
                            {
                                "cast_id": 4,
                                "character": "The Narrator",
                                "credit_id": "52fe4250c3a36847f80149f3",
                                "id": 819,
                                "name": "Edward Norton",
                                "order": 0,
                                "profile_path": "/iUiePUAQKN4GY6jorH9m23cbVli.jpg"
                            },
                            {
                                "cast_id": 5,
                                "character": "Tyler Durden",
                                "credit_id": "52fe4250c3a36847f80149f7",
                                "id": 287,
                                "name": "Brad Pitt",
                                "order": 1,
                                "profile_path": "/kc3M04QQAuZ9woUvH3Ju5T7ZqG5.jpg"
                            }
                        ]
                    });
                } else {
                    return $q.reject();
                }
            }

            return {
                getCredits: getCredits
            };
        }]);
    }));

    // Load the HTML Template Cache
    beforeEach(module('templates'));

    beforeEach(inject(function ($rootScope, _$compile_, _theMovieDBService_) {
        $scope = $rootScope.$new();
        $compile = _$compile_;
        $rootScope.url = url;
        $scope.movieId = movieId;
        mockMovieSvc = _theMovieDBService_;
        passPromise = true;
    }));


    function compileDirective() {
        element = angular.element('<cast-section movie-id="{{movieId}}"></cast-section>');
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

    describe('Cast Section Tests', function () {

        it('should call getCredits', function () {
            spyOn(mockMovieSvc, 'getCredits').and.callThrough();
            compileDirective();
            expect(mockMovieSvc.getCredits).toHaveBeenCalledWith(movieId);
        });
        it('should set cast when successfully retrieved', function () {
            spyOn(mockMovieSvc, 'getCredits').and.callThrough();
            compileDirective();
            expect(isolateScope.cast.length).toBe(2);
        });
        it('should not set cast when not successfully retrieved', function () {
            spyOn(mockMovieSvc, 'getCredits').and.callThrough();
            passPromise = false;
            compileDirective();
            expect(isolateScope.cast).not.toBeDefined();
        });
        it('should have a total of 2', function () {
            spyOn(mockMovieSvc, 'getCredits').and.callThrough();
            compileDirective();
            expect(isolateScope.total).toBe(2);
        });

        it('should render 2 cast members', function () {
            spyOn(mockMovieSvc, 'getCredits').and.callThrough();
            compileDirective();
            var thumbs = element.find('.thumbnail');
            expect(thumbs.length).toBe(2);
        });

        it('should use url for images', function () {
            spyOn(mockMovieSvc, 'getCredits').and.callThrough();
            compileDirective();
            var images = element.find('img');
            var ngSrc = angular.element(images[0]).attr('ng-src');
            expect(ngSrc).toContain(url);
        });
        it('should render 2 images', function () {
            spyOn(mockMovieSvc, 'getCredits').and.callThrough();
            compileDirective();
            var images = element.find('img');
            expect(images.length).toBe(2);
        });
    });
});