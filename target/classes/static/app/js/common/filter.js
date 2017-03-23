define([
    'angular'
], function (angular) {
    angular.module('CustomFilter', [])
        .filter('escape', function () {
            return window.encodeURIComponent;
        })
        .filter('capitalize', function () {
            return function (input, all) {
                return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }) : '';
            }
        })
        .filter('underscoreless', function () {
            return function (input) {
                return (!!input) ? input.replace(/_/g, ' ') : '';
            };
        })
        .filter('blankZero', function () {
            return function (number) {
                return number > 0 ? number : null;
            };
        })
    ;
});