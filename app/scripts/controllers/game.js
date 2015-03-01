'use strict';

/**
 * @ngdoc function
 * @name kivipeli.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the kivipeli
 */
angular.module('kivipeli')
  .controller('GameCtrl', function(
    $scope,
    aiPlayer,
    gameService,
    turnMediatorService
  ) {

    gameService.newGame();
    $scope.gameService          = gameService;
    $scope.turnMediatorService  = turnMediatorService;
    $scope.aiPlayer             = aiPlayer;

  });
