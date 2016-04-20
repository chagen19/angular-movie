describe('MovieDetail Controller Tests', function () {

    beforeEach(module('movieApp.movieDetail'));

    var createController, $scope, $stateParams, mockMovieSvc, passPromise;

    // Provide Mock for theMovieDBService
    beforeEach(module(function ($provide) {
        $provide.factory('movieSvc', ['$q', function ($q) {
            function getMovieById(movieId) {
                if (passPromise) {
                    return $q.when();
                } else {
                    return $q.reject();
                }
            }

            return {
                getMovieById: getMovieById
            };
        }]);
    }));

    beforeEach(inject(function (_$controller_, _$rootScope_, _movieSvc_) {
        $scope = _$rootScope_.$new();
        $stateParams = {movieId: 1};
        mockMovieSvc = _movieSvc_;
        passPromise = true;

        createController = function() {
            return _$controller_('DetailCtrl', {
                $scope: $scope,
                $stateParams: $stateParams,
                theMovieDBService: mockMovieSvc
            });
        }

    }));

    describe('Get Movie Details', function () {

        it('controller should be defined', function () {
            var controller = createController();
            expect(controller).toBeDefined();
        });

        it('movieId should be set to 1', function () {
            var controller = createController();
            expect(controller.movieId).toBe(1);
        });
        it('theMovieDBService should be called', function () {
            spyOn(mockMovieSvc, 'getMovieById').and.callThrough();
            var controller = createController();
            expect(mockMovieSvc.getMovieById).toHaveBeenCalled();
        });

        it('theMovieDBService should be called with movieId of 1', function () {
            spyOn(mockMovieSvc, 'getMovieById').and.callThrough();
            var controller = createController();
            expect(mockMovieSvc.getMovieById.calls.argsFor(0)).toEqual([2]);
        });

    });
});