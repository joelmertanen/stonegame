'use strict';

describe('Service: turnMediatorService', function () {

  // load the service's module
  beforeEach(module('kivipeli'));

  // instantiate service
  var turnMediatorService;
  beforeEach(inject(function (_turnMediatorService_) {
    turnMediatorService = _turnMediatorService_;
  }));

  it('should do something', function () {
    expect(!!turnMediatorService).toBe(true);
  });

});
