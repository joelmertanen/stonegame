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
    gameService
  ) {

    $scope.gameIsRunning = true;

    $scope.currentLocation  = gameService.currentLocation;
    $scope.moveButtonTo     = gameService.moveButtonTo;
    $scope.fieldSize        = gameService.fieldSize;

  });
