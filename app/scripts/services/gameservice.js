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
    var gameResult;

    var currentLocation = {};
    var service = {
        currentLocation: currentLocation,
        fieldSize: fieldSize,
        gameResult: gameResult,
        newGame: newGame,
        moveButtonTo: moveButtonTo
    };

    newGame();

    return service;

    function updateGameStatus(whichPlayerMoved) {
        // if game ended
        if (currentLocation.row === 0 && currentLocation.column === 0) {
            // don't break the reference... this is annoying.
            if (whichPlayerMoved === 'ai') {
                service.gameResult = 'won';
            } else if (whichPlayerMoved === 'human') {
                service.gameResult = 'lost';
            } else {
                // string params are always difficult. hopefully this helps in catching them:
                throw "Unidentified player name: " + whichPlayerMoved;
            }

        }
    }

    function newGame() {
        // indeces are zero-based
        // extend to keep references alive
        angular.extend(currentLocation, {
            row:    fieldSize - 1,
            column: fieldSize - 1
        });
        service.gameResult = undefined;
    }

    function moveButtonTo(moveObject, whichPlayer) {
        // validate input, it might come from DOM as a string
        var parsedRow       = window.parseInt(moveObject.row);
        var parsedColumn    = window.parseInt(moveObject.column);
        // validate first:
        if (parsedRow < 0 || parsedColumn < 0) {
            return false;
        }

        // if game has ended
        var isGameEnded = currentLocation.row === 0 && currentLocation.column === 0;
        if (isGameEnded) {
            return false;
        }

        // only one move to left up or make a diagonal move
        var oneUpOrLeft = (currentLocation.row - parsedRow) + (currentLocation.column - parsedColumn) === 1;
        var oneDiagonal = parsedRow === currentLocation.row - 1 && parsedColumn === currentLocation.column - 1;
        if (!oneUpOrLeft && !oneDiagonal) {
            return false;
        }

        angular.extend(currentLocation, {
            row: parsedRow,
            column: parsedColumn
        });

        updateGameStatus(whichPlayer);

        return true;
    }
  });
