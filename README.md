# Done

Done provides asynchronous file system helpers (with completion callbacks) for recursive operations. Some helpers are similar to those found in the excellent [wrench-js](https://github.com/ryanmcgrath/wrench-js). A couple features that make Done unique:

1.  Most helpers invoke an iterator callback for each file/directory visited instead of one master callback at the end.
2.  Most helpers invoke a seperate completion callback when an operation has finished (allows you to separate iteration code from wrap-up code). 

## Usage 

### Recursively reading a directory

The following example shows how to recursively read a directory with both an iterative callback (called every time an item is discovered) and a completion callback (called when every item has been discovered).

``` js
  var done = require('done');

  done.readdirRecursive('./', 
    function(err, path, isDir, cb) {
      if (err) 
        console.log("An error occured " + err);
      else
        console.log("Discovered item " + path);
        
      cb(); // always call cb() when you're finished
    },
    function(err) {
      if (err)
        console.log("An error occured " + err);
      else
        console.log("Finished reading dir!");
    });

```

You can also omit the completion callback.

``` js
  var done = require('done');

  done.readdirRecursive('./', 
    function(err, path, isDir, cb) {
      if (err) 
        console.log("An error occured " + err);
      else
        console.log("Discovered item " + path);
        
      cb(); // always call cb() when you're finished
    });

```