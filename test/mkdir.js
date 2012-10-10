var done = require('../lib/done'),
    path = require('path');
    
// make a dir
exports.mkdirRecursive = function(test) {
  test.expect(1);
  done.mkdirRecursive("test/tmp/my/path", null, null, function(err){
    test.ifError(err);
    test.done();
  });
}
