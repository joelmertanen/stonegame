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
    var currentLocation = {
        row:    fieldSize - 1,
        column: fieldSize - 1
    };
    var service = {
        currentLocation: currentLocation,
        fieldSize: fieldSize,
        moveButtonTo: moveButtonTo
    };
    return service;

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
