define([
    'angular',
    'growl',
    'swal'
], function (angular) {

    angular.module('ServiceModule', [])
        .factory('Growl', [function () {
            return {
                notify: function (title) {
                    $.growl({
                        title: title,
                        url: ''
                    }, {
                        element: 'body',
                        type: "inverse",
                        allow_dismiss: true,
                        placement: {
                            from: "top",
                            align: "center"
                        },
                        offset: {
                            x: 20,
                            y: 85
                        },
                        spacing: 10,
                        z_index: 1031,
                        delay: 2500,
                        timer: 1000,
                        url_target: '_blank',
                        mouse_over: false,
                        icon_type: 'class',
                        template: '<div data-growl="container" class="alert" role="alert">' +
                        '<button type="button" class="close" data-growl="dismiss">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '<span class="sr-only">Close</span>' +
                        '</button>' +
                        '<span data-growl="icon"></span>' +
                        '<span data-growl="title"></span>' +
                        '<span data-growl="message"></span>' +
                        '<a href="#" data-growl="url"></a>' +
                        '</div>'
                    });
                },
                error: function (title) {
                    $.growl({
                        title: title,
                        url: ''
                    }, {
                        element: 'body',
                        type: "danger",
                        allow_dismiss: true,
                        placement: {
                            from: "top",
                            align: "center"
                        },
                        offset: {
                            x: 20,
                            y: 85
                        },
                        spacing: 10,
                        z_index: 1031,
                        delay: 2500,
                        timer: 1000,
                        url_target: '_blank',
                        mouse_over: false,
                        icon_type: 'class',
                        template: '<div data-growl="container" class="alert" role="alert">' +
                        '<button type="button" class="close" data-growl="dismiss">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '<span class="sr-only">Close</span>' +
                        '</button>' +
                        '<span data-growl="icon"></span>' +
                        '<span data-growl="title"></span>' +
                        '<span data-growl="message"></span>' +
                        '<a href="#" data-growl="url"></a>' +
                        '</div>'
                    });
                }
            };
        }])
        .factory('Swal', [function () {
            return {
                confirm: function (message, callback) {
                    swal({
                        title: message,
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                    }, function () {
                        callback();
                    });
                },
                message: function (message, type, callback) {
                    swal({
                        title: message,
                        type: type,
                        showCancelButton: false,
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                    }, function () {
                        callback();
                    });
                }
            }
        }])
        .factory('Utils', [function () {
            return {
                serialize: function (obj) {
                    var str = [];
                    for (var p in obj)
                        if (obj.hasOwnProperty(p) && obj[p]) {
                            if (Array.isArray(obj[p])) {
                                obj[p].forEach(function (item) {
                                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(item));
                                });
                            } else {
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            }
                        }
                    return str.join("&");
                }
            }
        }])
        .factory('Pageable', ['$timeout', function ($timeout) {
            return {
                init: function (scope, name, page, resource, pageable) {
                    scope.pageable = pageable;
                    scope.total = page.total;
                    scope.hasNext = page.hasNext;
                    scope[name] = page.content;

                    function reInitList(p) {
                        scope[name] = [];
                        updateList(p);
                    }

                    function updateList(p) {
                        scope.total = p.total;
                        scope.hasNext = p.hasNext;

                        p.content.forEach(function (data) {
                            scope[name].push(data);
                        });
                    }

                    scope.query = function () {
                        scope.pageable.page = 0;
                        scope.hasNext = false;
                        return resource.query(scope.pageable, reInitList).$promise;
                    };

                    scope.more = function () {
                        if (scope.hasNext) {
                            scope.pageable.page++;
                            return resource.query(scope.pageable, updateList).$promise;
                        }
                    };

                    scope.sort = function (sort) {
                        scope.pageable.sort = sort;
                        scope[name] = [];
                        return resource.query(scope.pageable, reInitList).$promise;
                    };
                }
            }
        }])
    ;
});

