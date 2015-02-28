'use strict';

/**
 * @ngdoc directive
 * @name kivipeli.directive:kkGame
 * @description
 * # kkGame
 */
angular.module('kivipeli')
  .directive('kkGame', function (_) {
    return {
      templateUrl: '/views/kk-game.html',
      restrict: 'E',
      link: function postLink($scope) {
        $scope.fieldSize = 8;
        $scope.getSizeArray = getSizeArray;

        function getSizeArray() {
            return _.range($scope.fieldSize);
        }
      }
    };
  });
