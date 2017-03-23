define([
    'angular'
], function (angular) {
    angular.module('CommonConfig', [])
        .config(["$httpProvider", function ($httpProvider) {
            var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

            function convertDateStringsToDates(input) {
                // Ignore things that aren't objects.
                if (typeof input !== "object") return input;

                for (var key in input) {
                    if (!input.hasOwnProperty(key)) continue;

                    var value = input[key];
                    var match;
                    // Check for string properties which look like dates.
                    if (typeof value === "string" && isNaN(value) && (match = value.match(regexIso8601))) {
                        var milliseconds = Date.parse(match[0]);
                        if (!isNaN(milliseconds)) {
                            input[key] = new Date(milliseconds);
                        }
                    } else if (typeof value === "object") {
                        // Recurse into object
                        convertDateStringsToDates(value);
                    }
                }
            }

            $httpProvider.defaults.transformResponse.push(function (responseData) {
                convertDateStringsToDates(responseData);
                return responseData;
            });

            (function () {

                function pad(number) {
                    if (number < 10) {
                        return '0' + number;
                    }
                    return number;
                }

                Date.prototype.toISOString = function () {
                    return this.getUTCFullYear() +
                        '-' + pad(this.getUTCMonth() + 1) +
                        '-' + pad(this.getUTCDate()) +
                        'T' + pad(this.getUTCHours()) +
                        ':' + pad(this.getUTCMinutes()) +
                        ':' + pad(this.getUTCSeconds()) +
                        '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5);
                };

                Date.prototype.addHours = function (h) {
                    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
                    return this;
                };
                Date.prototype.subtractHours = function (h) {
                    this.setTime(this.getTime() - (h * 60 * 60 * 1000));
                    return this;
                };

            }());

        }])
        .config(['$locationProvider', function ($locationProvider) {
            //$locationProvider.hashPrefix('!');
        }]);
});