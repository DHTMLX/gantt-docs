---
sidebar_label: Promise
title: Promise method
description: "Konstruktor für Promise-Objekte"
---

# Promise

### Description

@short: Konstruktor für Promise-Objekte

@signature: Promise: new (executor: (resolve: (value?: any) =\> void, reject: (reason?: any) =\> void) =\> void) =\> Promise\<unknown\>

### Parameters

- `executor` - (required) *function* - eine Callback-Funktion zur Einrichtung des Promise

### Returns
- ` promise` - (object) - das resultierende Promise-Objekt

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

Dies ist der Promise-Objekt-Konstruktor von [Bluebird](http://bluebirdjs.com/docs/why-bluebird.html), der in der Gantt-Bibliothek enthalten ist.
