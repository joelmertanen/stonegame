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
        moveButtonDiagonal: moveButtonDiagonal,
        moveButtonLeft: moveButtonLeft,
        moveButtonUp: moveButtonUp
    };

    return service;

    function validateMove(whichPlayerMoves) {
        if (whichPlayerMoves === 'human' && !service.isHumanTurn) {
            return false;
        }

        if (whichPlayerMoves === 'ai' && service.isHumanTurn) {
            return false;
        }

        return true;
    }

    function moveButtonUp(whichPlayer) {
        if (!validateMove(whichPlayer)) {
            return;
        }

        if (gameService.moveButtonUp(whichPlayer)) {
            nextTurn(whichPlayer);
        }
    }

    function moveButtonLeft(whichPlayer) {
        if (!validateMove(whichPlayer)) {
            return;
        }

        if (gameService.moveButtonLeft(whichPlayer)) {
            nextTurn(whichPlayer);
        }
    }

    function moveButtonDiagonal(whichPlayer) {
        if (!validateMove(whichPlayer)) {
            return;
        }

        if (gameService.moveButtonDiagonal(whichPlayer)) {
            nextTurn(whichPlayer);
        }
    }

    function nextTurn(whichPlayerMoved) {
        if (gameService.gameResult) {
            service.isHumanTurn = true;
            return;
        }

        service.isHumanTurn = whichPlayerMoved === 'ai';

        if (!service.isHumanTurn) {
            aiPlayer.makeMove(gameService.currentLocation)
              .then(function(directionStr) {
                var result = false;
                // this awkward API resulted from preventing a ciruclar dependency turnmediator <-< aiPlayer.
                // don't know how to improve this...
                if (directionStr === 'up') {
                    result = gameService.moveButtonUp('ai');
                } else if (directionStr === 'left') {
                    result = gameService.moveButtonLeft('ai');
                } else {
                    result = gameService.moveButtonDiagonal('ai');
                }

                if (!result) {
                    throw 'Invalid move ' + directionStr;
                }

                nextTurn('ai');
              });
        }
    }

  });
