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

    var aiIsWinning = false;

    var service = {
      aiIsWinning: aiIsWinning,
      makeMove: wrapMakeMove
    };

    return service;

    function isWinningCell(row, column) {
      // the way to find a winning cell is just a generalized backwards induction
      if (row === 1 && column % 2 === 1) {
        return true;
      }

      if (column === 1 && row % 2 === 1) {
        return true;
      }

      if (column % 2 === 0 || row % 2 === 0) {
        return true;
      }

      return false;
    }

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

      // try to move to a losing cell to win the game.
      // there can be always only one, so check them in order

      // left
      if (!isWinningCell(currentLocation.row, currentLocation.column - 1)) {
        service.aiIsWinning = true;
        return 'left';
      }

      // diagonal
      if (!isWinningCell(currentLocation.row - 1, currentLocation.column - 1)) {
        service.aiIsWinning = true;
        return 'diagonal';
      }

      // up
      if (!isWinningCell(currentLocation.row - 1, currentLocation.column)) {
        service.aiIsWinning = true;
        return 'up';
      }

      // no winning cells, just go somewhere
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
