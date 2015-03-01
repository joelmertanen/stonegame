'use strict';

describe('Service: gameService', function () {

  // load the service's module
  beforeEach(module('kivipeli'));

  // instantiate service
  var gameService;
  beforeEach(inject(function (_gameService_) {
    gameService = _gameService_;
  }));

  describe('currentLocation', function() {
    it('should return the location', function() {
      var defaultFieldSize = 8;
      var location = gameService.currentLocation;
      expect(location.row).toBe(defaultFieldSize - 1);
      expect(location.column).toBe(defaultFieldSize - 1);
    });
  });

  describe('move button', function() {
    var oldLocation;
    var oldRow;
    var oldColumn;

    beforeEach(function() {
      oldLocation = gameService.currentLocation;
      oldRow      = oldLocation.row;
      oldColumn   = oldLocation.column;
    });

    it('should move left', function() {
      var nextLocation = {
        row: oldRow,
        column: oldColumn - 1
      };
      var wasMoveAllowed = gameService.moveButtonLeft('human');
      var newLocation = gameService.currentLocation;

      expect(wasMoveAllowed).toBe(true);
      expect(newLocation.row).toBe(nextLocation.row);
      expect(newLocation.column).toBe(nextLocation.column);
    });

    it('should move up', function() {
      var nextLocation = {
        row: oldRow - 1,
        column: oldColumn
      };
      var wasMoveAllowed = gameService.moveButtonUp('human');
      var newLocation = gameService.currentLocation;

      expect(wasMoveAllowed).toBe(true);
      expect(newLocation.row).toBe(nextLocation.row);
      expect(newLocation.column).toBe(nextLocation.column);
    });

    it('should move diagonal', function() {
      var nextLocation = {
        row: oldRow - 1,
        column: oldColumn - 1
      };
      var wasMoveAllowed = gameService.moveButtonDiagonal('human');
      var newLocation = gameService.currentLocation;

      expect(wasMoveAllowed).toBe(true);
      expect(newLocation.row).toBe(nextLocation.row);
      expect(newLocation.column).toBe(nextLocation.column);
    });

    it('should validate input and not change location to under zero', function() {
      function moveToLeftmostCell() {
        if (!gameService.moveButtonLeft()) {
          return;
        }
        moveToLeftmostCell();
      }

      moveToLeftmostCell();

      var wasMoveAllowed  = gameService.moveButtonDiagonal('human');
      var newLocation     = gameService.currentLocation;

      expect(wasMoveAllowed).toBe(false);
      expect(newLocation.row).toBe(oldRow);
      expect(newLocation.column).toBe(0);
    });

  });

});
