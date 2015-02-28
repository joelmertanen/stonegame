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
    $timeout,
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
            $timeout(
                aiMoveButton,
                500
            );
        }
    }

    function aiMoveButton() {
        var aiPlayerMove = aiPlayer.makeMove(gameService.currentLocation);

        if (gameService.moveButtonTo(aiPlayerMove.row, aiPlayerMove.column)) {
            service.isHumanTurn = true;
        }
    }


  });
