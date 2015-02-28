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
    var gameFieldSize = 8;
    var currentLocation = {
        row:    gameFieldSize - 1,
        column: gameFieldSize - 1
    };
    var service = {
        getCurrentLocation: getCurrentLocation,
        moveButtonTo: moveButtonTo
    };
    return service;


    function getCurrentLocation() {
        return angular.copy(currentLocation);
    }

    function moveButtonTo(row, column) {
        var parsedRow       = window.parseInt(row);
        var parsedColumn    = window.parseInt(column);
        // validate first:
        // if game has ended
        var isGameEnded = currentLocation.row === 0 && currentLocation.column === 0;
        if (isGameEnded) {
            return;
        }

        // only one move to left or up
        var sum = (currentLocation.row - parsedRow) + (currentLocation.column - parsedColumn);
        if (sum !== 1) {
            return;
        }

        angular.extend(currentLocation, {
            row: parsedRow,
            column: parsedColumn
        });
    }
  });
