define([
    'jquery',
    'angular',
    'angularAnimate',
    'angularResource',
    'angularRoute',
    'angularMessages',
    'angularSanitize',
    'angularUI',
    'angularUISelect',
    'angularAutoDisable',
    'dateDropDowns',
    'checklistModel',
    'chosen',
    'elastic',
    'common/filter',
    'common/directive',
    'common/config',
    'module/security',
    'module/user',
    'module/kanjiHybrid',
    'module/kanjiHybridPhrase'
], function ($, angular) {

    var authority = null;

    angular.module('MHR', [
        "ngRoute",
        "ngAnimate",
        "ngMessages",
        "ngSanitize",
        "ui.bootstrap",
        "ui.select",
        "checklist-model",
        "monospaced.elastic",
        "localytics.directives",
        "ngAutodisable",
        "date-dropdowns",
        "CustomFilter",
        "CustomDirective",
        "CommonConfig",
        "SecurityModule",
        "UserModule",
        "KanjiHybridModule",
        "KanjiHybridPhraseModule"
    ])
        .config(['$routeProvider', '$tooltipProvider', function ($routeProvider, $tooltipProvider) {
            $routeProvider
                .when('/home', {
                    template: '',
                    controller: 'RedirectController'
                })
                .otherwise({redirectTo: '/home'});
            $tooltipProvider
                .options({
                    placement: 'bottom',
                    animation: true,
                    popupDelay: 1000,
                    appendToBody: false
                })

        }])
        .controller('RedirectController', ['$location',
            function ($location) {
                $location.path('/user/list');
            }])
        .controller('MainController', ['$rootScope', '$location', '$http', 'Security',
            function ($rootScope, $location, $http, Security) {
                Date.prototype.addDays = function (days) {
                    var dat = new Date(this.valueOf());
                    dat.setDate(dat.getDate() + days);
                    return dat;
                };
                $rootScope.print = function (id) {
                    window.print();
                };
                $rootScope.$on("$routeChangeSuccess", function () {
                    $rootScope.loading = false;
                });
                $rootScope.sidebarToggle = {
                    left: false,
                    right: false,
                    layoutType: localStorage.getItem('ma-layout-status')
                };
                $rootScope.sidebarStat = function (event) {
                    if (!angular.element(event.target).parent().hasClass('active')) {
                        this.sidebarToggle.left = false;
                    }
                };
                $rootScope.activePath = function (path, full) {
                    if (full) {
                        if ($location.path() == path) {
                            return "active"
                        }
                    } else if ($location.path().substr(0, path.length) == path) {
                        return "active"
                    } else {
                        return ""
                    }
                };
                $rootScope.fullScreen = function () {
                    function launchIntoFullscreen(element) {
                        if (element.requestFullscreen) {
                            element.requestFullscreen();
                        } else if (element.mozRequestFullScreen) {
                            element.mozRequestFullScreen();
                        } else if (element.webkitRequestFullscreen) {
                            element.webkitRequestFullscreen();
                        } else if (element.msRequestFullscreen) {
                            element.msRequestFullscreen();
                        }
                    }

                    function exitFullscreen() {
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                        } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen();
                        }
                    }

                    if (exitFullscreen()) {
                        launchIntoFullscreen(document.documentElement);
                    }
                    else {
                        launchIntoFullscreen(document.documentElement);
                    }
                }
            }])
        .run(['Security', '$rootScope', '$location',
            function (Security, $rootScope, $location) {
                Security.setAuth(authority);
            }]);

    angular.element(document).ready(function () {
        console.log('document ready');
        $.get('/authentication')
            .done(function (data) {
                if (typeof data !== 'string') {
                    authority = data;
                }
            })
            .always(function () {
                angular.bootstrap(document, ['MHR']);
            });
    });
});
