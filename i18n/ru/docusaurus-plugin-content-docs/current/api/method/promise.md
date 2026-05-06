---
sidebar_label: Promise
title: Метод Promise
description: "Конструктор объекта Promise"
---

# Promise

### Description

@short: Конструктор объекта Promise

@signature: Promise: new (executor: (resolve: (value?: any) =\> void, reject: (reason?: any) =\> void) =\> void) =\> Promise\<unknown\>

### Parameters

- `executor` - (обязательный) *function* - обратный вызов, используемый для инициализации promise

### Returns
- ` promise` - (object) - сам объект promise

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

[Bluebird](http://bluebirdjs.com/docs/why-bluebird.html) конструктор объекта Promise от Bluebird, поставляемый вместе с библиотекой Gantt.