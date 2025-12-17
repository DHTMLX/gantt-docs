---
sidebar_label: Promise
title: Promise method
description: "Promise object constructor"
---

# Promise

### Description

@short: Promise object constructor

@signature: Promise: new (executor: (resolve: (value?: any) =\> void, reject: (reason?: any) =\> void) =\> void) =\> Promise\<unknown\>

### Parameters

- `executor` - (required) *function* - a callback used to initialize the promise

### Returns
- ` promise` - (object) - the promise object

### Example

~~~jsx
new gantt.Promise(function(resolve, reject) {
    setTimeout(function(){
        resolve();
    }, 5000);
}).then(function(){
    alert("Resolved")
});
~~~

### Details

[Bluebird](http://bluebirdjs.com/docs/why-bluebird.html) Promise object constructor, bundled with the Gantt library.
