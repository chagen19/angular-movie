describe('MovieDetail Controller Tests', function () {
    'use strict';
    // This must be first, before providing the mock
    beforeEach(module('movieApp.movieDetail'));

    var createController, $scope, $stateParams, $timeout, mockMovieSvc, passPromise;

    // Provide Mock for theMovieDBService
    beforeEach(module(function ($provide) {
        $provide.factory('theMovieDBService', ['$q', function ($q) {
            function getMovieById(movieId) {
                if (passPromise) {
                        return $q.when({movieData: "Data"});
                } else {
                    return $q.reject();
                }
            }

            return {
                getMovieById: getMovieById
            };
        }]);
    }));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$timeout_, _theMovieDBService_) {
        $scope = _$rootScope_.$new();
        $stateParams = {movieId: 1};
        $timeout = _$timeout_;
        mockMovieSvc = _theMovieDBService_;

        passPromise = true;
        
        createController = function() {
            return _$controller_('DetailCtrl', {
                $scope: $scope,
                $stateParams: $stateParams
            });
        };

    }));
    describe('Sanity Check', function () {

        it('controller should be defined', function () {
            var controller = createController();
            expect(controller).toBeDefined();
        });

    });
    describe('Retrieve Movie Tests', function () {
        it('movieId should be set to 1', function () {
            var controller = createController();
            expect(controller.movieId).toBe(1);
        });
        it('theMovieDBService should be called', function () {
            spyOn(mockMovieSvc, 'getMovieById').and.callThrough();
            createController();
            expect(mockMovieSvc.getMovieById).toHaveBeenCalled();
        });

        it('theMovieDBService should be called with movieId of 1', function () {
            spyOn(mockMovieSvc, 'getMovieById').and.callThrough();
            createController();
            expect(mockMovieSvc.getMovieById.calls.argsFor(0)).toEqual([1]);
        });
        it('should set movie data when movie is retrieved successfully', function () {
            spyOn(mockMovieSvc, 'getMovieById').and.callThrough();
            var controller = createController();
            $scope.$apply(); //resolves the deffered calling the success callback
            expect(controller.data).toBeDefined();
        });

        it('should not set movie data when movie is not retrieved successfully', function () {
            spyOn(mockMovieSvc, 'getMovieById').and.callThrough();
            passPromise = false;
            var controller = createController();
            $scope.$apply(); //resolves the deffered calling the success callback
            expect(controller.data).not.toBeDefined();
        });

    });

    describe('Re-init Isotope Tests', function () {

        it('should broadcast', function () {
            spyOn($scope, '$broadcast');
            var controller = createController();
            controller.reInitIso();
            $timeout.flush();
            expect($scope.$broadcast).toHaveBeenCalledWith('isotope.onLayout');
        });
    });
});