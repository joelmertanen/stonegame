'use strict';

/**
 * @ngdoc function
 * @name kivipeli.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the kivipeli
 */
angular.module('kivipeli')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
