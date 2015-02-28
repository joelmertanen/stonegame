'use strict';

describe('Service: aiPlayer', function () {

  // load the service's module
  beforeEach(module('kivipeli'));

  // instantiate service
  var aiPlayer;
  beforeEach(inject(function (_aiPlayer_) {
    aiPlayer = _aiPlayer_;
  }));

  it('should do something', function () {
    expect(!!aiPlayer).toBe(true);
  });

});
