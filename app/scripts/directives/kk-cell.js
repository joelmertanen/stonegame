'use strict';

/**
 * @ngdoc directive
 * @name kivipeli.directive:kkCell
 * @description
 * # kkCell
 */
angular.module('kivipeli')
  .directive('kkCell', function () {
    return {
      templateUrl: '/views/kk-cell.html',
      restrict: 'E',
      scope: {
        'row': '@',
        'column': '@',
        'isMovable': '=',
        'isReserved': '=',
        'moveButtonTo': '&'
      }, link: function($scope) {

        $scope.cellClicked = cellClicked;

        function cellClicked() {
            if (!$scope.isMovable) {
                return;
            }

            $scope.moveButtonTo({
                row: $scope.row,
                column: $scope.column
            });
        }
      }
    };
  });
