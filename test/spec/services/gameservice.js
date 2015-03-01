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

  describe('moveButtonTo', function() {
    var oldLocation;
    var oldRow;
    var oldColumn;

    beforeEach(function() {
      oldLocation = gameService.currentLocation;
      oldRow      = oldLocation.row;
      oldColumn   = oldLocation.column;
    });

    it('should update location with ints', function() {
      var nextLocation = {
        row: oldRow - 1,
        column: oldColumn
      };
      var wasMoveAllowed = gameService.moveButtonTo(nextLocation);
      var newLocation = gameService.currentLocation;

      expect(wasMoveAllowed).toBe(true);
      expect(newLocation.row).toBe(nextLocation.row);
      expect(newLocation.column).toBe(nextLocation.column);
    });

    it('should update location with strings', function() {
      var nextLocation = {
        row: oldRow - 1,
        column: oldColumn
      };

      var wasMoveAllowed = gameService.moveButtonTo({
        row: nextLocation.row + '',
        column: nextLocation.column + ''
      });
      var newLocation = gameService.currentLocation;

      expect(wasMoveAllowed).toBe(true);
      expect(newLocation.row).toBe(nextLocation.row);
      expect(newLocation.column).toBe(nextLocation.column);
    });

    it('should allow diagonal moves', function() {
      var nextLocation = {
        row: oldRow - 1,
        column: oldColumn - 1
      };

      var wasMoveAllowed = gameService.moveButtonTo(nextLocation);
      var newLocation = gameService.currentLocation;

      expect(wasMoveAllowed).toBe(true);
      expect(newLocation.row).toBe(nextLocation.row);
      expect(newLocation.column).toBe(nextLocation.column);
    });

    it('should validate input and not change location on if over one cell of movement', function() {
      var nextLocation = {
        row: oldRow - 2, // illegal
        column: oldColumn
      };
      var wasMoveAllowed  = gameService.moveButtonTo(nextLocation);
      var newLocation     = gameService.currentLocation;

      expect(wasMoveAllowed).toBe(false);
      expect(newLocation.row).toBe(oldRow);
      expect(newLocation.column).toBe(oldColumn);
    });

    it('should validate input and not change location to under zero', function() {
      function moveToLeftmostCell() {
        var loc = gameService.currentLocation;
        if (loc.column === 0) {
          return;
        }
        gameService.moveButtonTo({
          row: loc.row,
          column: loc.column - 1
        });
        moveToLeftmostCell();
      }

      moveToLeftmostCell();

      var nextLocation = {
        row:    oldRow,
        column: -1
      };

      var wasMoveAllowed  = gameService.moveButtonTo(nextLocation);
      var newLocation     = gameService.currentLocation;

      expect(wasMoveAllowed).toBe(false);
      expect(newLocation.row).toBe(oldRow);
      expect(newLocation.column).toBe(0);
    });

  });

});
