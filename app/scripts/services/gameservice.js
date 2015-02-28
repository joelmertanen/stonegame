'use strict';

/**
 * @ngdoc service
 * @name devApp.gameService
 * @description
 * # gameService
 * Service in the devApp.
 */
angular.module('kivipeli')
  .factory('gameService', function() {
    var fieldSize = 8;
    var gameIsRunning = true;

    var currentLocation = {};
    var service = {
        currentLocation: currentLocation,
        fieldSize: fieldSize,
        gameIsRunning: gameIsRunning,
        newGame: newGame,
        moveButtonTo: moveButtonTo
    };

    newGame();

    return service;

    function updateGameStatus() {
        if (currentLocation.row === 0 && currentLocation.column === 0) {
            // don't break the reference... this is annoying.
            service.gameIsRunning = false;
        }
    }

    function newGame() {
        // indeces are zero-based
        // extend to keep references alive
        angular.extend(currentLocation, {
            row:    fieldSize - 1,
            column: fieldSize - 1
        });
        gameIsRunning = true;
    }

    function moveButtonTo(row, column) {
        if (row < 0 || column < 0) {
            return;
        }

        var parsedRow       = window.parseInt(row);
        var parsedColumn    = window.parseInt(column);
        // validate first:
        // if game has ended
        var isGameEnded = currentLocation.row === 0 && currentLocation.column === 0;
        if (isGameEnded) {
            return;
        }

        // only one move to left or up, checks also direction
        var sum = (currentLocation.row - parsedRow) + (currentLocation.column - parsedColumn);
        if (sum !== 1) {
            return;
        }

        angular.extend(currentLocation, {
            row: parsedRow,
            column: parsedColumn
        });

        updateGameStatus();
    }
  });
