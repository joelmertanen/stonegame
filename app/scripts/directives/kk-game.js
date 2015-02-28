'use strict';

/**
 * @ngdoc directive
 * @name devApp.directive:kkGame
 * @description
 * # kkGame
 */
angular.module('devApp')
  .directive('kkGame', function () {
    return {
      templateUrl: '/views/kk-game.html',
      restrict: 'E',
      link: function postLink($scope) {
      	$scope.fieldSize = 8;
      }
    };
  });
