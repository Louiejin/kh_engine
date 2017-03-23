/**
 * Created by Reana on 12/13/2016.
 */

/**
 * Created by Reana on 12/7/2016.
 */

define([
    'angular',
    'angularRoute',
    'common/resource',
    'common/service'
], function (angular) {

    angular.module('KanjiHybridPhraseModule', ['ngRoute', 'ResourceModule', 'ServiceModule'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/kanji_hybrid_phrase/list', {
                    templateUrl: "view/kanji_hybrid_phrase/kanji_hybrid_phrase_list.html",
                    controller: "KanjiHybridPhraseListController",
                    permission: "ROLE_ADMIN",
                    resolve: {
                        page: ['KanjiHybridPhraseResource', function (KanjiHybridPhraseResource) {
                            return KanjiHybridPhraseResource.query({page: 0, size: 10, query: null}).$promise;
                        }]
                    }
                })
                .when('/kanji_hybrid_phrase/:id', {
                    templateUrl: "view/kanji_hybrid_phrase/kanji_hybrid_phrase_details.html",
                    controller: "KanjiHybridPhraseDetailsController",
                    permission: "ROLE_ADMIN",
                    resolve: {
                        kanjiHybridPhrase: ['$route', 'KanjiHybridPhraseResource', function ($route, KanjiHybridPhraseResource) {
                            if ($route.current.params.id == 'create')
                                return {};
                            else
                                return KanjiHybridPhraseResource.get({id: $route.current.params.id}).$promise;
                        }]
                    }
                })
        }])
        .controller('KanjiHybridPhraseListController', ['$scope', 'page', 'KanjiHybridPhraseResource',
            function ($scope, page, KanjiHybridPhraseResource) {
                $scope.pageable = {page: 0, size: 10, query: null};

                function updateList(page) {
                    if (!$scope.kanjiHybridPhrases)
                        $scope.kanjiHybridPhrases = [];
                    page.content.forEach(function (data) {
                        $scope.kanjiHybridPhrases.push(data);
                    });
                    $scope.total = page.total;
                    $scope.hasNext = page.hasNext;
                }

                updateList(page);

                $scope.query = function () {
                    $scope.pageable.page = 0;
                    $scope.kanjiHybridPhrases = [];
                    $scope.hasNext = false;
                    KanjiHybridPhraseResource.query($scope.pageable, updateList);
                };

                $scope.more = function () {
                    if ($scope.hasNext) {
                        $scope.pageable.page++;
                        KanjiHybridPhraseResource.query($scope.pageable, updateList);
                    }
                };

                $scope.sort = function (sort) {
                    $scope.pageable.sort = sort;
                    $scope.kanjiHybridPhrases = [];
                    KanjiHybridPhraseResource.query($scope.pageable, updateList);
                };
            }])
        .controller('KanjiHybridPhraseDetailsController', ['$scope', '$location', 'kanjiHybridPhrase', 'KanjiHybridPhraseResource', 'Growl', 'Swal',
            function ($scope, $location, kanjiHybridPhrase, KanjiHybridPhraseResource, Growl, Swal) {
                $scope.kanjiHybridPhrase = kanjiHybridPhrase;

                $scope.save = function () {
                    if ($scope.kanjiHybridPhraseForm.$valid) {
                        return KanjiHybridPhraseResource.save($scope.kanjiHybridPhrase, function (saved) {
                            Growl.notify("Successfully Saved");
                            $location.path('/kanji_hybrid_phrase/list');
                        }, function (error) {
                            Growl.notify("Could not save");
                        }).$promise;
                    }
                };

                $scope.remove = function () {
                    Swal.confirm("Are you sure you want to delete?", function () {
                        return KanjiHybridPhraseResource.remove({id: $scope.kanjiHybridPhrase.id}, function () {
                            Growl.notify("Successfully Deleted");
                            $location.path('/kanji_hybrid_phrase/list');
                        }, function (error) {
                            Growl.notify("Could not delete");
                        }).$promise;
                    })
                };
            }])
    ;
});

