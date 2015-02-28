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
    it('should update location with ints', function() {
      var oldLocation = gameService.currentLocation;
      var oldRow    = oldLocation.row;
      var oldColumn = oldLocation.column;

      var newRow    = oldRow - 1;
      var newColumn = oldColumn;
      gameService.moveButtonTo(newRow, newColumn);
      var newLocation = gameService.currentLocation;

      expect(newLocation.row).toBe(newRow);
      expect(newLocation.column).toBe(newColumn);
    });

    it('should update location with strings', function() {
      var oldLocation = gameService.currentLocation;
      var oldRow    = oldLocation.row;
      var oldColumn = oldLocation.column;

      var newRow    = oldRow - 1;
      var newColumn = oldColumn;
      gameService.moveButtonTo(newRow + '', newColumn + '');
      var newLocation = gameService.currentLocation;

      expect(newLocation.row).toBe(newRow);
      expect(newLocation.column).toBe(newColumn);
    });

    it('should validate input and not change location on row and col change', function() {
      var oldLocation = gameService.currentLocation;
      var oldRow    = oldLocation.row;
      var oldColumn = oldLocation.column;

      var newRow    = oldRow - 1;
      var newColumn = oldColumn - 1;
      gameService.moveButtonTo(newRow, newColumn);
      var newLocation = gameService.currentLocation;

      expect(newLocation.row).toBe(oldRow);
      expect(newLocation.column).toBe(oldColumn);
    });

    it('should validate input and not change location to under zero', function() {
      function moveToLeftmostCell() {
        var loc = gameService.currentLocation;
        if (loc.column === 0) {
          return;
        }
        gameService.moveButtonTo(loc.row, loc.column - 1);
        moveToLeftmostCell();
      }

      moveToLeftmostCell();

      var oldLocation = gameService.currentLocation;
      var oldRow      = oldLocation.row;
      var oldColumn   = oldLocation.column;

      var newRow      = oldRow;
      var newColumn   = -1;
      gameService.moveButtonTo(newRow, newColumn);
      var newLocation = gameService.currentLocation;

      expect(newLocation.row).toBe(oldRow);
      expect(newLocation.column).toBe(oldColumn);
    });

  });

});
