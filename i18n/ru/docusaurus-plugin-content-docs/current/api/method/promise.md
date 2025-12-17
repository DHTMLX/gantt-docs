---
sidebar_label: Promise
title: Promise method
description: "Конструктор для объектов Promise"
---

# Promise

### Description

@short: Конструктор для объектов Promise

@signature: Promise: new (executor: (resolve: (value?: any) =\> void, reject: (reason?: any) =\> void) =\> void) =\> Promise\<unknown\>

### Parameters

- `executor` - (required) *function* - функция обратного вызова для настройки promise

### Returns
- ` promise` - (object) - возвращаемый объект promise

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

Это конструктор объекта Promise из библиотеки [Bluebird](http://bluebirdjs.com/docs/why-bluebird.html), включённой в состав библиотеки Gantt.
