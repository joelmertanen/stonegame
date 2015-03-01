'use strict';

/**
 * @ngdoc service
 * @name devApp.aiPlayer
 * @description
 * # aiPlayer
 * Factory in the devApp.
 */
angular.module('kivipeli')
  .factory('aiPlayer', function(
    $q,
    $timeout
  ) {

    var service = {
      makeMove: wrapMakeMove
    };

    return service;

    function wrapMakeMove(currentLocation) {
      var def = $q.defer();

      // artificial slowness to simulate some actual AI ;)
      $timeout(function() {
        def.resolve(makeMove(currentLocation));
      }, 500);
      return def.promise;
    }

    function makeMove(currentLocation) {
      // no options, move up:
      if (currentLocation.row === 0) {
        return {
          row: 0,
          column: currentLocation.column - 1
        };
      }

      // no options, move left:
      if (currentLocation.column === 0) {
        return {
          row: currentLocation.row - 1,
          column: 0
        };
      }

      if (Math.random() < 0.5) {
        return {
          row: currentLocation.row - 1,
          column: currentLocation.column
        };
      }

      return {
        row: currentLocation.row,
        column: currentLocation.column - 1
      };

    }

  });
