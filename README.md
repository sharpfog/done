Done
====

Done provides some asynchronous file system helpers (with completion callbacks) in Node.js that I've needed in the past. These helpers are similar to those found in the excellent [wrench-js](https://github.com/ryanmcgrath/wrench-js). A couple features that make Done unique:
1. Helpers in Done invoke an iterator callback for each file/directory recursively visited instead of one master callback at the end.
2. Helpers in Done invoke a seperate completion callback when an operation has finished (allows you to separate forEach code from wrap-up code). 