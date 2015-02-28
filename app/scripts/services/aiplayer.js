'use strict';

/**
 * @ngdoc service
 * @name devApp.aiPlayer
 * @description
 * # aiPlayer
 * Factory in the devApp.
 */
angular.module('kivipeli')
  .factory('aiPlayer', function() {

    var service = {
      makeMove: makeMove
    };

    return service;

    function makeMove(currentLocation) {
      if (currentLocation.row === 0) {
        return {
          row: 0,
          column: currentLocation.column - 1
        }
      }

      if (currentLocation.column === 0) {
        return {
          row: currentLocation.row - 1,
          column: 0
        }
      }

      if (Math.random() < 0.5) {
        return {
          row: currentLocation.row - 1,
          column: currentLocation.column
        }
      }

      return {
        row: currentLocation.row,
        column: currentLocation.column - 1
      }

    }

  });
