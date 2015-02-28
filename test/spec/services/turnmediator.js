'use strict';

describe('Service: turnMediatorService', function () {
  var mockDependency;

  // load the service's module
  beforeEach(module('kivipeli'));

  beforeEach(function () {
    mockDependency = {
        moveButtonTo: function () {
            return true;
        }
    };

    module(function ($provide) {
        $provide.value('gameService', mockDependency);
    });
  });

  // instantiate service
  var turnMediatorService;
  beforeEach(inject(function (_turnMediatorService_) {
    turnMediatorService = _turnMediatorService_;
  }));

  describe('humanMoveButtonTo', function() {

    it('should change the state of the isHumanTurn', function() {
        expect(turnMediatorService.isHumanTurn).toBe(true);
        turnMediatorService.humanMoveButtonTo(0, 0);
        expect(turnMediatorService.isHumanTurn).toBe(false);
    });

  });

});
