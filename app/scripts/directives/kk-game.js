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
      templateUrl: 'views/kk-game.html',
      restrict: 'E',
      scope: {
        ctrlMoveButtonLeft: '&moveButtonLeft',
        ctrlMoveButtonUp: '&moveButtonUp',
        ctrlMoveButtonDiagonal: '&moveButtonDiagonal',
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

        function moveButtonTo(row, column) {
            var parsedRow       = window.parseInt(row, 10);
            var parsedColumn    = window.parseInt(column, 10);
            var isToLeft    =   parsedRow === $scope.currentLocation.row     && parsedColumn === $scope.currentLocation.column - 1;
            var isToUp      =   parsedRow === $scope.currentLocation.row - 1 && parsedColumn === $scope.currentLocation.column;
            var isDiagonal  =   parsedRow === $scope.currentLocation.row - 1 && parsedColumn === $scope.currentLocation.column - 1;

            if (isToLeft) {
                return $scope.ctrlMoveButtonLeft();
            }

            if (isToUp) {
                return $scope.ctrlMoveButtonUp();
            }

            if (isDiagonal) {
                return $scope.ctrlMoveButtonDiagonal();
            }
        }

        function isMovableCell(row, column) {
            if (!$scope.isHumanTurn) {
                return;
            }
            var isToLeft    =   row === $scope.currentLocation.row && column === $scope.currentLocation.column - 1;
            var isToUp      =   row === $scope.currentLocation.row - 1 && column === $scope.currentLocation.column;
            var isDiagonal  =   row === $scope.currentLocation.row - 1 && column === $scope.currentLocation.column - 1;
            return isToUp || isToLeft || isDiagonal;
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

      }
    };
  });
