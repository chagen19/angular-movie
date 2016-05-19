describe('Poster Section Directive Tests', function () {
    'use strict';

    var $scope, $compile, element, mockMovieSvc, passPromise, isolateScope;
    var url = "http://images/";
    var movieId = '123';
    // This must be first, before providing the mock
    beforeEach(module('movieApp.movieDetail'));

    // Provide Mock for TheMovieDBService
    beforeEach(module(function ($provide) {
        $provide.factory('TheMovieDBService', ['$q', function ($q) {
            function getImages(movieId) {
                if (passPromise) {
                    return $q.when({
                        "id": 550,
                        "backdrops": [
                            {
                                "file_path": "/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg",
                                "width": 1280,
                                "height": 720,
                                "iso_639_1": null,
                                "aspect_ratio": 1.78,
                                "vote_average": 6.647058823529412,
                                "vote_count": 17
                            },
                            {
                                "file_path": "/8T0hpqWsgzKhWGsXGD8ilkwRPkC.jpg",
                                "width": 1280,
                                "height": 720,
                                "iso_639_1": null,
                                "aspect_ratio": 1.78,
                                "vote_average": 6.375,
                                "vote_count": 12
                            },
                            {
                                "file_path": "/hNFMawyNDWZKKHU4GYCBz1krsRM.jpg",
                                "width": 1280,
                                "height": 720,
                                "iso_639_1": null,
                                "aspect_ratio": 1.78,
                                "vote_average": 5.714285714285714,
                                "vote_count": 14
                            },
                            {
                                "file_path": "/mMZRKb3NVo5ZeSPEIaNW9buLWQ0.jpg",
                                "width": 1920,
                                "height": 1080,
                                "iso_639_1": null,
                                "aspect_ratio": 1.78,
                                "vote_average": 5.5625,
                                "vote_count": 8
                            },
                            {
                                "file_path": "/9Kr6UzouF674Smw3D9Hp2DlH1Vo.jpg",
                                "width": 1280,
                                "height": 720,
                                "iso_639_1": null,
                                "aspect_ratio": 1.78,
                                "vote_average": 5.55,
                                "vote_count": 10
                            },
                            {
                                "file_path": "/eTVdpy2JXaGFit2V2ToZ79v9D7R.jpg",
                                "width": 1920,
                                "height": 1080,
                                "iso_639_1": null,
                                "aspect_ratio": 1.78,
                                "vote_average": 5.25,
                                "vote_count": 12
                            },
                            {
                                "file_path": "/fuSeIUKsizmfiPIwDH7lKiFNQoD.jpg",
                                "width": 1280,
                                "height": 720,
                                "iso_639_1": null,
                                "aspect_ratio": 1.78,
                                "vote_average": 4.3,
                                "vote_count": 5
                            }
                        ]
                    });
                } else {
                    return $q.reject();
                }
            }
            function getImageBaseUrl() {
                if (passPromise) {
                    return $q.when(url);
                } else {
                    return $q.reject();
                }
            }
            return {
                getImages: getImages,
                getImageBaseUrl: getImageBaseUrl
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
        element = angular.element('<poster-section movie-id="{{movieId}}"></poster-section>');
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

    describe('Poster Section Tests', function () {

        it('should call getImages', function () {
            spyOn(mockMovieSvc, 'getImages').and.callThrough();
            compileDirective();
            expect(mockMovieSvc.getImages).toHaveBeenCalledWith(movieId);
        });
        it('should set backdrops when successfully retrieved', function () {
            spyOn(mockMovieSvc, 'getImages').and.callThrough();
            compileDirective();
            expect(isolateScope.poster.backdrops).toBeDefined();
        });
        it('should not set cast when not successfully retrieved', function () {
            spyOn(mockMovieSvc, 'getImages').and.callThrough();
            passPromise = false;
            compileDirective();
            expect(isolateScope.backdrops).not.toBeDefined();
        });

        it('should have a total of 7 backdrops', function () {
            spyOn(mockMovieSvc, 'getImages').and.callThrough();
            compileDirective();
            expect(isolateScope.poster.backdrops.length).toBe(7);
        });
 
        it('should render 7 slides', function () {
            spyOn(mockMovieSvc, 'getImages').and.callThrough();
            compileDirective();
            var slides = element.find('uib-slide');
            expect(slides.length).toBe(7);
        });

        it('should use url for images', function () {
            spyOn(mockMovieSvc, 'getImages').and.callThrough();
            compileDirective();
            var images = element.find('img');
            var ngSrc = angular.element(images[0]).attr('ng-src');
            expect(ngSrc).toContain(url);
        });
        it('should render 7 images', function () {
            spyOn(mockMovieSvc, 'getImages').and.callThrough();
            compileDirective();
            var images = element.find('img');
            expect(images.length).toBe(7);
        });
    });
});