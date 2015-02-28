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
        $scope.isMovableCell = isMovableCell;
        $scope.isReservedCell = isReservedCell;
        $scope.onMovableClick = onMovableClick;

        $scope.currentLocation = {
            row: $scope.fieldSize - 1,
            column: $scope.fieldSize - 1
        };

        function getSizeArray() {
            return _.range($scope.fieldSize);
        }

        function isMovableCell(row, column) {
            var isToLeft =  row === $scope.currentLocation.row && column === $scope.currentLocation.column - 1;
            var isToTop =   row === $scope.currentLocation.row - 1 && column === $scope.currentLocation.column;
            return isToTop || isToLeft;
        }

        function isReservedCell(row, column) {
            return  row     === $scope.currentLocation.row &&
                    column  === $scope.currentLocation.column;
        }

        function onMovableClick(row, column) {
            _.extend($scope.currentLocation, {
                row: window.parseInt(row),
                column: window.parseInt(column)
            });
        }
      }
    };
  });
