'use strict';

/**
 * @ngdoc directive
 * @name kivipeli.directive:kkGame
 * @description
 * # kkGame
 */
angular.module('kivipeli')
  .directive('kkGame', function (
    _
  ) {

    return {
      templateUrl: '/views/kk-game.html',
      restrict: 'E',
      scope: {
        ctrlMoveButtonTo: '&moveButtonTo',
        currentLocation: '=',
        fieldSize: '=',
        isHumanTurn: '='
      },
      link: function postLink($scope, element) {
        element.find('.kk-game-field').focus();

        $scope.getSizeArray = getSizeArray;
        $scope.isMovableCell = isMovableCell;
        $scope.isReservedCell = isReservedCell;
        $scope.keypressEvent = keypressEvent;
        $scope.moveButtonTo = moveButtonTo;

        function getSizeArray() {
            if (!$scope.currentLocation) {
                return [];
            }
            return _.range($scope.fieldSize);
        }

        function isMovableCell(row, column) {
            if (!$scope.isHumanTurn) {
                return;
            }
            var isToLeft    =   row === $scope.currentLocation.row && column === $scope.currentLocation.column - 1;
            var isToUp      =   row === $scope.currentLocation.row - 1 && column === $scope.currentLocation.column;
            return isToUp || isToLeft;
        }

        function isReservedCell(row, column) {
            return  row     === $scope.currentLocation.row &&
                    column  === $scope.currentLocation.column;
        }

        function keypressEvent(keyEvent) {
            var keyUp   =   keyEvent.keyCode === 38;
            var keyLeft =   keyEvent.keyCode === 37;

            if (keyUp) {
                $scope.moveButtonTo(
                    $scope.currentLocation.row - 1,
                    $scope.currentLocation.column
                );

                keyEvent.preventDefault();
            }

            if (keyLeft) {
                $scope.moveButtonTo(
                    $scope.currentLocation.row,
                    $scope.currentLocation.column - 1
                );

                keyEvent.preventDefault();
            }
        }

        function moveButtonTo(row, column) {
            $scope.ctrlMoveButtonTo({
                row:    row,
                column: column
            });
        }
      }
    };
  });
