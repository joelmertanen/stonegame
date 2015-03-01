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
        moveButtonDiagonal: moveButtonDiagonal,
        moveButtonUp: moveButtonUp,
        moveButtonLeft: moveButtonLeft
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
                throw 'Unidentified player name: ' + whichPlayerMoved;
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

    function moveButtonTo(newLocation) {
        angular.extend(currentLocation, {
            row: newLocation.row,
            column: newLocation.column
        });
    }

    function isMoveValid(newLocation) {
        if (newLocation.row < 0 || newLocation.column < 0) {
            return false;
        }

        // if game has ended
        var isGameEnded = currentLocation.row === 0 && currentLocation.column === 0;
        if (isGameEnded) {
            return false;
        }

        // only one move to left up or make a diagonal move
        var oneUpOrLeft = (currentLocation.row - newLocation.row) + (currentLocation.column - newLocation.column) === 1;
        var oneDiagonal = newLocation.row === currentLocation.row - 1 && newLocation.column === currentLocation.column - 1;
        if (!oneUpOrLeft && !oneDiagonal) {
            return false;
        }

        return true;
    }

    function moveButtonDiagonal(whichPlayerMoved) {
        var newLocation = {
            row:    currentLocation.row - 1,
            column: currentLocation.column - 1
        };
        if (!isMoveValid(newLocation)) {
            return false;
        }

        moveButtonTo(newLocation);
        updateGameStatus(whichPlayerMoved);
        return true;
    }

    function moveButtonLeft(whichPlayerMoved) {
        var newLocation = {
            row:    currentLocation.row,
            column: currentLocation.column - 1
        };
        if (!isMoveValid(newLocation)) {
            return false;
        }

        moveButtonTo(newLocation);
        updateGameStatus(whichPlayerMoved);
        return true;
    }

    function moveButtonUp(whichPlayerMoved) {
        var newLocation = {
            row:    currentLocation.row - 1,
            column: currentLocation.column
        };
        if (!isMoveValid(newLocation)) {
            return false;
        }

        moveButtonTo(newLocation);
        updateGameStatus(whichPlayerMoved);
        return true;
    }

  });
