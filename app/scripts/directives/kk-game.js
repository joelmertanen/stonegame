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
      scope: {
        endGame: '&'
      },
      link: function postLink($scope, element) {
        $scope.fieldSize = 8;
        $scope.currentLocation = {
            row: $scope.fieldSize - 1,
            column: $scope.fieldSize - 1
        };

        element.find('.kk-game-field').focus();

        $scope.getSizeArray = getSizeArray;
        $scope.isMovableCell = isMovableCell;
        $scope.isReservedCell = isReservedCell;
        $scope.keypressEvent = keypressEvent;
        $scope.moveButtonTo = moveButtonTo;

        $scope.$watch('currentLocation', function(newLocation) {
            if (newLocation.row === 0 && newLocation.column === 0) {
                $scope.endGame();
            }
        }, true);

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

        function keypressEvent(keyEvent) {
            var keyUp =     keyEvent.keyCode === 38;
            var keyLeft =   keyEvent.keyCode === 37;

            if (keyUp) {
                if ($scope.currentLocation.row === 0) {
                    return;
                }

                $scope.moveButtonTo(
                    $scope.currentLocation.row - 1,
                    $scope.currentLocation.column
                );
            }

            if (keyLeft) {
                if ($scope.currentLocation.column === 0) {
                    return;
                }

                $scope.moveButtonTo(
                    $scope.currentLocation.row,
                    $scope.currentLocation.column - 1
                );
            }
        }

        function moveButtonTo(row, column) {
            _.extend($scope.currentLocation, {
                row: window.parseInt(row),
                column: window.parseInt(column)
            });
        }
      }
    };
  });
