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
      template: '<div class="kk-cell">at {{row}}, {{column}}</div>',
      restrict: 'E',
      scope: {
        'row': '@',
        'column': '@'
      }
    };
  });
