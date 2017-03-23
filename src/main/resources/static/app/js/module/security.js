define([
    'angular',
    'angularRoute',
    'common/service'
], function (angular) {

    angular.module('SecurityModule', ['ngRoute', 'ServiceModule'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/login', {
                    templateUrl: 'view/account/login.html',
                    controller: 'LoginController',
                    anonymous: true
                })
                .when('/unauthorized', {
                    templateUrl: 'view/account/unauthorized.html',
                    anonymous: true
                });
        }])
        .controller('LoginController', ['$rootScope', '$scope', '$http', '$location', '$route', 'Security', 'Growl',
            function ($rootScope, $scope, $http, $location, $route, Security, Growl) {
                $scope.login = function () {
                    $rootScope.loading = true;
                    $http({
                        method: 'POST',
                        url: '/login-action',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function (obj) {
                            var str = [];
                            for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        data: {login_user: $scope.username, login_pass: $scope.password}
                    }).success(function () {
                        $http.get('/authentication').success(function (data) {
                            Security.setAuth(data);
                            $location.path('/home');
                        })
                    }).error(function (data, status, headers, config) {
                        Growl.notify("Unable to login. Please try again.");
                        $scope.username = "";
                        $scope.password = "";
                        $rootScope.loading = false;
                    });
                };
            }])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push(['$q', '$location', '$injector', 'Security',
                function ($q, $location, $injector, Security) {
                    return {
                        responseError: function (response) {
                            if (response.status === 403) {
                                $location.path('/unauthorized');
                            } else if (response.status === 401) {
                                Security.clear();
                                var isAnonymousPage = $injector.get('$route').current.$$route.anonymous === true;
                                if (!isAnonymousPage) {
                                    $location.path('/login');
                                }
                            }
                            return $q.reject(response);
                        }
                    }
                }]);
        }])
        .factory('Security', ['$rootScope', function ($rootScope) {
            var auth = null;
            return {
                clear: function () {
                    auth = null;
                    $rootScope.auth = {};
                    $rootScope.$broadcast('permissionsChanged');
                    $rootScope.$broadcast('securityCleared');
                },
                setAuth: function (a) {
                    auth = a;
                    if (auth) {
                        $rootScope.auth = {
                            username: this.getUsername(),
                            name: this.getName()
                        };
                    }
                    $rootScope.$broadcast('permissionsChanged')
                },
                getUsername: function () {
                    return angular.copy(auth.username);
                },
                getName: function () {
                    return angular.copy(auth.firstName) + " " + angular.copy(auth.lastName);
                },
                getAuth: function () {
                    return angular.copy(auth);
                },
                hasPermission: function (permission) {
                    if (permission == undefined) {
                        return false;
                    }
                    permission = permission.trim();
                    var notPermissionFlag = permission[0] === '!';
                    if (notPermissionFlag) {
                        permission = permission.slice(1).trim();
                    }
                    if (auth && auth.roles) {
                        for (var i = 0; i < auth.roles.length; i++) {
                            if (auth.roles[i] === permission) {
                                var hasPermission = true;
                                return (hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag);
                            }
                        }
                    }
                    return false;
                },
                hasAnyPermission: function (permissions) {
                    var ps = permissions.split(",");
                    for (var i = 0; i < ps.length; i++) {
                        if (this.hasPermission(ps[i])) {
                            return true;
                        }
                    }
                    return false;
                },
                isEmpty: function () {
                    return auth == null;
                }
            };
        }])
        .directive('isAuthenticated', ['Security', function (Security) {
            return {
                link: function (scope, element, attrs) {
                    function toggleVisibilityBasedOnPermission() {
                        if (Security.getAuth() != null)
                            element.show();
                        else
                            element.hide();
                    }

                    toggleVisibilityBasedOnPermission();
                    scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
                }
            };
        }])
        .directive('isNotAuthenticated', ['Security', function (Security) {
            return {
                link: function (scope, element, attrs) {
                    function toggleVisibilityBasedOnPermission() {
                        if (Security.getAuth() == null)
                            element.show();
                        else
                            element.hide();
                    }

                    toggleVisibilityBasedOnPermission();
                    scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
                }
            };
        }])
        .directive('hasPermission', ['Security', function (Security) {
            return {
                link: function (scope, element, attrs) {
                    function toggleVisibilityBasedOnPermission() {
                        if (Security.hasPermission(attrs.hasPermission))
                            element.show();
                        else
                            element.hide();
                    }

                    toggleVisibilityBasedOnPermission();
                    scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
                }
            };
        }])
        .directive('hasAnyPermission', ['Security', function (Security) {
            return {
                link: function (scope, element, attrs) {
                    function toggleVisibilityBasedOnPermission() {
                        if (Security.hasAnyPermission(attrs.hasAnyPermission))
                            element.show();
                        else
                            element.hide();
                    }

                    toggleVisibilityBasedOnPermission();
                    scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
                }
            };
        }])
        .directive('enablePermission', ['Security', function (Security) {
            return {
                link: function (scope, element, attrs) {
                    function toggleEnabledBasedOnPermission() {
                        if (Security.hasPermission(attrs.enablePermission))
                            element.prop('disabled', false);
                        else
                            element.prop('disabled', true);
                    }

                    toggleEnabledBasedOnPermission();
                    scope.$on('permissionsChanged', toggleEnabledBasedOnPermission);
                }
            };
        }])
        .run(['$rootScope', '$location', '$http', 'Security',
            function ($rootScope, $location, $http, Security) {
                $rootScope.logout = function () {
                    $rootScope.loading = true;
                    $http({
                        method: 'GET',
                        url: '/logout'
                    }).finally(function () {
                        Security.clear();
                        $rootScope.loading = false;
                        $location.path('/login');
                    });
                };
                $rootScope.$on('$routeChangeStart', function (scope, next, current) {
                    $rootScope.loading = true;
                    if ($location.$$path.indexOf("login") < 0 &&
                        $location.$$path.indexOf("registration") < 0 &&
                        $location.$$path.indexOf("password") < 0) {
                        $rootScope.loginRedirect = $location.$$path;
                    }
                    if (next.$$route && next.$$route.anonymous !== true) {
                        var permission = next.$$route.permission;
                        if (Security.isEmpty()) {
                            $rootScope.loading = false;
                            $location.path('/login');
                        }
                        else if (permission !== undefined && !Security.hasAnyPermission(permission)) {
                            $location.path('/unauthorized');
                        }
                    }
                });
            }]);
});

