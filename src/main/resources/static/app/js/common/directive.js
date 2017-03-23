define([
    'angular',
    'niceScroll'
], function (angular) {
    angular.module('CustomDirective', [])
        .directive('goClick', ['$location', function ($location) {
            return function (scope, element, attrs) {
                var path;

                attrs.$observe('goClick', function (val) {
                    path = val;
                });

                element.bind('click', function () {
                    scope.$apply(function () {
                        $location.path(path);
                    });
                });
            };
        }])
        .directive('defaultUser', ['$http', function ($http) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    attrs.$observe('ngSrc', function (ngSrc) {
                        $http.get(ngSrc).error(function () {
                            element.attr('src', '/app/img/default_user.png'); // set default image
                        });
                    });
                }
            };
        }])
        .directive('toggleSidebar', [function () {
            return {
                restrict: 'A',
                scope: {
                    modelLeft: '=',
                    modelRight: '='
                },
                link: function (scope, element, attr) {
                    element.on('click', function () {

                        if (element.data('target') === 'mainmenu') {
                            if (scope.modelLeft === false) {
                                scope.$apply(function () {
                                    scope.modelLeft = true;
                                })
                            }
                            else {
                                scope.$apply(function () {
                                    scope.modelLeft = false;
                                })
                            }
                        }
                        if (element.data('target') === 'chat') {
                            if (scope.modelRight === false) {
                                scope.$apply(function () {
                                    scope.modelRight = true;
                                })
                            }
                            else {
                                scope.$apply(function () {
                                    scope.modelRight = false;
                                })
                            }
                        }
                    })
                }
            }
        }])
        .directive('toggleSubmenu', [function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.click(function () {
                        element.parent().toggleClass('toggled');
                        element.next('ul').stop(true, false).slideToggle(200);
                    })
                }
            }
        }])
        .directive('changeLayout', [function () {
            return {
                restrict: 'A',
                scope: {
                    changeLayout: '='
                },
                link: function (scope, element, attr) {
                    //Default State
                    if (scope.changeLayout === '1') {
                        element.prop('checked', true);
                    }
                    //Change State
                    element.on('change', function () {
                        if (element.is(':checked')) {
                            localStorage.setItem('ma-layout-status', 1);
                            scope.$apply(function () {
                                scope.changeLayout = '1';
                            })
                        }
                        else {
                            localStorage.setItem('ma-layout-status', 0);
                            scope.$apply(function () {
                                scope.changeLayout = '0';
                            })
                        }
                    })
                }
            }
        }])
        .directive('aPrevent', [function () {
            return {
                restrict: 'C',
                link: function (scope, element) {
                    element.on('click', function (event) {
                        event.preventDefault();
                    });
                }
            }
        }])
        .directive('stopPropagate', [function () {
            return {
                restrict: 'C',
                link: function (scope, element) {
                    element.on('click', function (event) {
                        event.stopPropagation();
                    });
                }
            }
        }])
        .directive('focusMe', ['$timeout', function ($timeout) {
            return {
                link: function (scope, element, attrs) {
                    scope.$watch(attrs.focusMe, function (value) {
                        if (value === true) {
                            console.log('value=', value);
                            $timeout(function () {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        }])
        .service('nicescrollService', function () {
            return {
                niceScroll: function (selector, color, cursorWidth) {
                    $(selector).niceScroll({
                        cursorcolor: color,
                        cursorborder: 0,
                        cursorborderradius: 0,
                        cursorwidth: cursorWidth,
                        bouncescroll: true,
                        mousescrollstep: 100,
                        autohidemode: false,
                        railvalign: 'top'
                    });
                }
            };
        })
        .directive('html', ['nicescrollService', function (nicescrollService) {
            return {
                restrict: 'E',
                link: function (scope, element) {
                    if (!element.hasClass('ismobile')) {
                        if (!$('.login-content')[0]) {
                            nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '8px');
                        }
                    }
                }
            }
        }])
        .directive('tableResponsive', ['nicescrollService', function (nicescrollService) {
            return {
                restrict: 'C',
                link: function (scope, element) {
                    if (!$('html').hasClass('ismobile')) {
                        $(element).niceScroll({
                            cursorcolor: 'rgba(0,0,0,0.3)',
                            cursorborder: 0,
                            cursorborderradius: 0,
                            cursorwidth: '8px',
                            bouncescroll: true,
                            mousescrollstep: 100,
                            autohidemode: false,
                            railvalign: 'top',
                            verticalrailenabled: false
                        });
                    }
                }
            }
        }])
        .directive('chosenResults', ['nicescrollService', function (nicescrollService) {
            return {
                restrict: 'C',
                link: function (scope, element) {
                    if (!$('html').hasClass('ismobile')) {
                        nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '8px');
                    }
                }
            }
        }])
        .directive('tabNav', ['nicescrollService', function (nicescrollService) {
            return {
                restrict: 'C',
                link: function (scope, element) {
                    if (!$('html').hasClass('ismobile')) {
                        nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '2px');
                    }
                }
            }
        }])
        .directive('cOverflow', ['nicescrollService', function (nicescrollService) {
            return {
                restrict: 'C',
                link: function (scope, element) {
                    if (!$('html').hasClass('ismobile')) {
                        nicescrollService.niceScroll(element, 'rgba(0,0,0,0.5)', '8px');
                    }
                }
            }
        }])
        .directive('eventFocus', ['FocusUtil', function (FocusUtil) {
            return function (scope, elem, attr) {
                elem.on(attr.eventFocus, function () {
                    FocusUtil(attr.eventFocusId);
                });

                // Removes bound events in the element itself
                // when the scope is destroyed
                scope.$on('$destroy', function () {
                    elem.off(attr.eventFocus);
                });
            };
        }])
        .factory('FocusUtil', ['$timeout', '$window', function ($timeout, $window) {
            return function (id) {
                // timeout makes sure that it is invoked after any other event has been triggered.
                // e.g. click events that need to run before the focus or
                // inputs elements that are in a disabled state but are enabled when those events
                // are triggered.
                $timeout(function () {
                    var element = $window.document.getElementById(id);
                    if (element)
                        element.focus();
                });
            };
        }])
        .directive('percentage', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, ngModelController) {
                    ngModelController.$parsers.push(function (data) {
                        return data / 100;
                    });

                    ngModelController.$formatters.push(function (data) {
                        return data * 100;
                    });
                }
            }
        })
        .directive('thousandths', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, ngModelController) {
                    ngModelController.$parsers.push(function (data) {
                        return data / 1000;
                    });

                    ngModelController.$formatters.push(function (data) {
                        return data * 1000;
                    });
                }
            }
        })
        .directive('ngEnter', function () {
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.ngEnter);
                        });
                        event.preventDefault();
                    }
                });
            };
        })
        .directive('filter', ['$filter', function ($filter) {
            return {
                require: '?ngModel',
                link: function (scope, elem, attrs, ctrl) {
                    if (!ctrl) return;

                    ctrl.$formatters.unshift(function (a) {
                        return $filter(attrs.filter)(ctrl.$modelValue);
                    });

                    ctrl.$parsers.unshift(function (viewValue) {
                        var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                        elem.val($filter(attrs.filter)(plainNumber));
                        return plainNumber;
                    });
                }
            };
        }])
        .directive('backButton', ['$window', function ($window) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    elem.bind('click', function () {
                        $window.history.back();
                    });
                }
            };
        }])
    ;
});