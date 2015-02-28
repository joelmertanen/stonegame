'use strict';

describe('Directive: kkGame', function () {

  // load the directive's module
  beforeEach(module('kivipeli'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<kk-game></kk-game>');
    element = $compile(element)(scope);
  }));
});
