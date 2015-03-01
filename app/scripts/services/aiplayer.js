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
      if (currentLocation.column === 0) {
        return 'up';
      }

      // no options, move left:
      if (currentLocation.row === 0) {
        return 'left';
      }

      var random = Math.random();

      if (random < 0.3) {
        return 'up';
      }

      if (random < 0.6) {
        return 'diagonal';
      }

      return 'left';
    }

  });
