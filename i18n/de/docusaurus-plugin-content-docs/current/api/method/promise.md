---
sidebar_label: Promise
title: Promise-Methode
description: "Promise Objektkonstruktor"
---

# Promise

### Description

@short: Promise Objektkonstruktor

@signature: Promise: new (executor: (resolve: (value?: any) =\> void, reject: (reason?: any) =\> void) =\> void) =\> Promise\<unknown\>

### Parameters

- `executor` - (erforderlich) *Funktion* - ein Callback, der verwendet wird, um das Promise zu initialisieren

### Returns
- ` promise` - (Objekt) - das Promise-Objekt

### Example

~~~jsx
new gantt.Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 5000);
}).then(() => {
    alert("Resolved");
});
~~~

### Details

[Bluebird](http://bluebirdjs.com/docs/why-bluebird.html) Promise Objektkonstruktor, der zusammen mit der Gantt-Bibliothek bereitgestellt wird.