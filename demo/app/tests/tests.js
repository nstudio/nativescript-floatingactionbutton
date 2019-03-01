describe('fab class', function() {
  it('can be instantiated', function() {
    var testFab;
    var Fab = require('nativescript-floatingactionbutton').Fab;
    if (Fab) {
      testFab = new Fab();
    }

    expect(function() {
      return new Fab();
    }).not.toThrow();

    expect(new Fab()).toBeDefined();
  });
});
