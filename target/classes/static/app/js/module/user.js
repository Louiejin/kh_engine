define([
    'angular',
    'angularRoute',
    'common/resource',
    'common/service'
], function (angular) {

    angular.module('UserModule', ['ngRoute', 'ResourceModule', 'ServiceModule'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/user/list', {
                    templateUrl: "view/user/user_list.html",
                    controller: "UserListController",
                    permission: "ROLE_ADMIN",
                    resolve: {
                        users: ['UserResource', function (UserResource) {
                            return UserResource.query().$promise;
                        }]
                    }
                })
                .when('/user/:id', {
                    templateUrl: "view/user/user.html",
                    controller: "UserDetailsController",
                    permission: "ROLE_ADMIN",
                    resolve: {
                        user: ['$route', 'UserResource', function ($route, UserResource) {
                            if ($route.current.params.id == 'create')
                                return {enabled: true, role: 'ROLE_USER'};
                            else
                                return UserResource.get({id: $route.current.params.id}).$promise;
                        }]
                    }
                })
        }])
        .controller('UserListController', ['$scope', 'users',
            function ($scope, users) {
                $scope.users = users;
            }])
        .controller('UserDetailsController', ['$scope', '$location', 'user', 'UserResource', 'Growl', 'Swal',
            function ($scope, $location, user, UserResource, Growl, Swal) {
                $scope.user = user;

                $scope.save = function () {
                    if ($scope.userForm.$valid) {
                        return UserResource.save($scope.user, function (saved) {
                            Growl.notify("Successfully Saved");
                            $location.path('/user/list');
                        }, function (error) {
                            Growl.notify("Could not save.");
                        }).$promise;
                    }
                };

                $scope.remove = function () {
                    Swal.confirm("Are you sure you want to delete?", function () {
                        return UserResource.remove({id: $scope.user.id}, function () {
                            Growl.notify("Successfully Deleted");
                            $location.path('/user/list');
                        }, function (error) {
                            Growl.notify("Could not delete.");
                        }).$promise;
                    })
                };
            }])
    ;
});

