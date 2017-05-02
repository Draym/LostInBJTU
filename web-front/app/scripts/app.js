'use strict';

/**
 * @ngdoc overview
 * @name LostInBJTUApp
 * @description
 * # LostInBJTUApp
 *
 * Main module of the application.
 */

angular
  .module('LostInBJTUApp', [
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'toaster',
    'angularFileUpload',
    'selector',
    'chart.js'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
  }]);
