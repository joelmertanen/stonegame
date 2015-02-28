'use strict';

/**
 * @ngdoc service
 * @name kivipeli.lodash
 * @description
 * # lodash
 * Service in the kivipeli.
 */
angular.module('lodash', [])
  .service('_', function () {
  	return window._;
  });
