'use strict';

/**
 * @ngdoc overview
 * @name kivipeli
 * @description
 * # kivipeli
 *
 * Main module of the application.
 */
angular
  .module('kivipeli', [
    'ngAnimate',
    'ngRoute',
    'lodash'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
      .when('/what', {
        templateUrl: 'views/what.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
