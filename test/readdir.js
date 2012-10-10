var done = require('../lib/done'),
    path = require('path');
    
// helpers
function filesToObj(base, files) {
  var obj = {};
  for (var i=0; i<files.length; i++) {
    obj[path.join(base, files[i])] = 1;
  }
  return obj;
}

var testPath = path.join('test', 'testdir');
    
// read a dir that doesn't exist
exports.readBadDir = function(test) {
  test.expect(1);
  done.readdir('./blah', null, function(err) {
    test.ok(err);
    test.done();
  });
}

// recursively read a dir that doesn't exist
exports.readBadDirRecursive = function(test) {
  test.expect(1);
  done.readdirRecursive('./blah', null, function(err) {
    test.ok(err);
    test.done();
  });
}
  
// read a dir
exports.readDir = function(test) {
  var files = filesToObj(testPath, [ 'hello', 'a.txt' ])
  
  test.expect(5);
  done.readdir('./test/testdir', 
    function(err, path, isDir, cb) {
      test.ifError(err);
      test.ok(files[path]);
      cb();
    }, function(err) {
      test.ifError(err);
      test.done();
    });
};

// recursively read a dir
exports.readDir = function(test) {
  var files = filesToObj(testPath, 
    [ 'hello', 
      path.join('hello', 'b.txt'), 
      path.join('hello', 'c.txt'), 
      'a.txt' ]);
  
  test.expect(9);
  done.readdirRecursive('./test/testdir', 
    function(err, path, isDir, cb) {
      test.ifError(err);
      test.ok(files[path]);
      cb();
    }, function(err) {
      test.ifError(err);
      test.done();
    });
};