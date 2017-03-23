/**
 * Created by Reana on 12/7/2016.
 */

define([
    'angular',
    'angularRoute',
    'common/resource',
    'common/service'
], function (angular) {

    angular.module('KanjiHybridModule', ['ngRoute', 'ResourceModule', 'ServiceModule'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/kanji_hybrid/list', {
                    templateUrl: "view/kanji_hybrid/kanji_hybrid_list.html",
                    controller: "KanjiHybridListController",
                    permission: "ROLE_ADMIN",
                    resolve: {
                        page: ['KanjiHybridResource', function (KanjiHybridResource) {
                            return KanjiHybridResource.query({page: 0, size: 10, query: null}).$promise;
                        }]
                    }
                })
                .when('/kanji_hybrid/:id', {
                    templateUrl: "view/kanji_hybrid/kanji_hybrid_details.html",
                    controller: "KanjiHybridDetailsController",
                    permission: "ROLE_ADMIN",
                    resolve: {
                        kanjiHybrid: ['$route', 'KanjiHybridResource', function ($route, KanjiHybridResource) {
                                if ($route.current.params.id == 'create')
                                return {};
                            else
                                return KanjiHybridResource.get({id: $route.current.params.id}).$promise;
                        }]
                    }
                })
        }])
        .controller('KanjiHybridListController', ['$scope', 'page', 'KanjiHybridResource',
            function ($scope, page, KanjiHybridResource) {
                $scope.pageable = {page: 0, size: 10, query: null};

                function updateList(page) {
                    if (!$scope.kanjiHybrids)
                        $scope.kanjiHybrids = [];
                    page.content.forEach(function (data) {
                        $scope.kanjiHybrids.push(data);
                    });
                    $scope.total = page.total;
                    $scope.hasNext = page.hasNext;
                }

                updateList(page);

                $scope.query = function () {
                    $scope.pageable.page = 0;
                    $scope.kanjiHybrids = [];
                    $scope.hasNext = false;
                    KanjiHybridResource.query($scope.pageable, updateList);
                };

                $scope.more = function () {
                    if ($scope.hasNext) {
                        $scope.pageable.page++;
                        KanjiHybridResource.query($scope.pageable, updateList);
                    }
                };

                $scope.sort = function (sort) {
                    $scope.pageable.sort = sort;
                    $scope.kanjiHybrids = [];
                    KanjiHybridResource.query($scope.pageable, updateList);
                };
            }])
        .controller('KanjiHybridDetailsController', ['$scope', '$location', 'kanjiHybrid', 'KanjiHybridResource', 'Growl', 'Swal',
            function ($scope, $location, kanjiHybrid, KanjiHybridResource, Growl, Swal) {
                $scope.kanjiHybrid = kanjiHybrid;

                $scope.save = function () {
                    if ($scope.kanjiHybridForm.$valid) {
                        return KanjiHybridResource.save($scope.kanjiHybrid, function (saved) {
                            Growl.notify("Successfully Saved");
                            $location.path('/kanji_hybrid/list');
                        }, function (error) {
                            Growl.notify("Could not save");
                        }).$promise;
                    }
                };

                $scope.remove = function () {
                    Swal.confirm("Are you sure you want to delete?", function () {
                        return KanjiHybridResource.remove({id: $scope.kanjiHybrid.id}, function () {
                            Growl.notify("Successfully Deleted");
                            $location.path('/kanji_hybrid/list');
                        }, function (error) {
                            Growl.notify("Could not delete");
                        }).$promise;
                    })
                };
            }])
    ;
});

