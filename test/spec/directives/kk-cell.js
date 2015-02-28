'use strict';

describe('Directive: kkCell', function () {

  // load the directive's module
  beforeEach(module('devApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<kk-cell></kk-cell>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the kkCell directive');
  }));
});
