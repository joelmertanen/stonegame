'use strict';

/**
 * @ngdoc service
 * @name devApp.turnMediator
 * @description
 * # turnMediator
 * Service in the devApp.
 */
angular.module('kivipeli')
  .factory('turnMediatorService', function(
    aiPlayer,
    gameService
  ) {
    var isHumanTurn = true;
    var service = {
        isHumanTurn: isHumanTurn,
        humanMoveButtonTo: humanMoveButtonTo
    };

    return service;

    function humanMoveButtonTo(row, column) {
        if (!service.isHumanTurn) {
            return;
        }

        if (gameService.moveButtonTo({
                row: row,
                column: column
            }, 'human')) {
            if (!gameService.gameResult) {
                service.isHumanTurn = false;
                aiMoveButton();
            }
        }
    }

    function aiMoveButton() {
        // async to simulate hardcore AI calculations ;)
        aiPlayer.makeMove(gameService.currentLocation)
          .then(function(aiPlayerMove) {
            if (gameService.moveButtonTo(aiPlayerMove, 'ai')) {
                service.isHumanTurn = true;
            }
          });
    }

  });
