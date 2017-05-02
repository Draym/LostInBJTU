'use strict';

describe('Service: submitResult', function () {

  // load the service's module
  beforeEach(module('LostInBJTUApp'));

  // instantiate service
  var submitResult;
  beforeEach(inject(function (_submitResult_) {
    submitResult = _submitResult_;
  }));

  it('should do something', function () {
    expect(!!submitResult).toBe(true);
  });

});
