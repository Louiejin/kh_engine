define([
    'angular',
    'angularResource'
], function (angular) {

    angular.module('ResourceModule', ['ngResource'])
        .factory('UserResource', ['$resource', function ($resource) {
            return $resource('/user/:id');
        }])
        .factory('KanjiHybridResource', ['$resource', function ($resource) {
            return $resource('/kanji_hybrid/:id', {}, {
                'query': {method: 'GET', url: '/kanji_hybrid', isArray: false}
            });
        }])
        .factory('KanjiHybridPhraseResource', ['$resource', function ($resource) {
            return $resource('/kanji_hybrid_phrase/:id', {}, {
                'query': {method: 'GET', url: '/kanji_hybrid_phrase', isArray: false}
            });
        }])
        .factory('ArticleResource', ['$resource', function ($resource) {
            return $resource('/article/:id', {}, {
                'query': {method: 'GET', url: '/article', isArray: false},
                'claim': {method: 'GET', url: '/article/claim/:id'}
            });
        }])
    ;
});

