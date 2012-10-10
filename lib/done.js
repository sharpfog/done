var fs = require('fs'),
    path = require('path');
    
function readdirImpl(dir, iterator, finished, recurse) {
  iterator = iterator || function() {};
  finished = finished || function() {};
  
  fs.readdirRecursive(dir, function(err, files) {
    if (err) return finished(err); // couldn't read dir
    
    var fileCount = files.length; // grab the file count
    if (!fileCount) return finished(); // no files, return immediately
    
    files.forEach(function(file) { // iterate files
      var filePath = path.join(dir, file);
      fs.stat(filePath, function(err, stat) { // stat the file
        var doneCallback = function(err) {
          // when a done callback is invoked, decrement the file counter
          if (--fileCount == 0) finished(); // all of our direct files have been processed
        }
        
        // let the caller know an error occurs (expect them to still invoke cb)
        if (err) return iterator(err, null, false, doneCallback);
        
        if (stat.isDirectory()) { 
          
          iterator(null, filePath, true, function() {
            if (recurse)
              exports.readdirRecursive(filePath, iterator, doneCallback, recurse); // recurse on callback
            else
              doneCallback();
          });   
        }
        else
          iterator(null, filePath, false, doneCallback);
      });
    });
  });
}
    
/**
 * done.readdir(dir, iterator(err, path, isDir, cb){}, finished(err){})
 * 
 * Reads a directory, invoking iterator() for each item discovered.
 * The iterator must call cb() after processing each item. The
 * master callback function finished() will be invoked after all items
 * have been discovered and procesed by iterator.
 */
exports.readdir = function(dir, iterator, finished) {
  readdirImpl(dir, iterator, finished, false);
}

/**
 * done.readdirRecursive(dir, iterator(err, path, isDir, cb){}, finished(err){})
 * 
 * Recursively reads a directory, invoking iterator() for each item 
 * discovered. The iterator must call cb() after processing each item. The
 * master callback function finished() will be invoked after all items
 * have been discovered and procesed by iterator.
 */
exports.readdirRecursive = function(dir, iterator, finished) {
  readdirImpl(dir, iterator, finished, true);
}
