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

        if (gameService.moveButtonTo(row, column)) {
            service.isHumanTurn = false;
            aiMoveButton();
        }
    }

    function aiMoveButton() {
        var s = aiPlayer.makeMove(gameService.currentLocation)
        s.then(function(aiPlayerMove) {
            if (gameService.moveButtonTo(aiPlayerMove.row, aiPlayerMove.column)) {
                service.isHumanTurn = true;
            }
        });
    }

  });
