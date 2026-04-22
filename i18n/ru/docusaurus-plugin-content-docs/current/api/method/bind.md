--- 
sidebar_label: bind
title: метод bind
description: "создает новую функцию, которая при вызове будет иметь значение <i>this</i>, установленное переданным значением"
---

# bind

### Description

@short: Создает новую функцию, которая при вызове будет иметь значение <i>this</i>, установленное переданным значением

@signature: bind: (method: GanttCallback, thisArg: any) =\> GanttCallback

### Parameters

- `method` - (required) *function* - целевая функция
- `thisArg` - (required) *object* - значение, которое будет передано в качестве параметра <i>this</i> целевой функции при вызове привязанной функции

### Returns
- ` bound_function` - (function) - новая функция, которая при вызове использует заданное значение <i>this</i> для исходной функции

### Example

~~~jsx
gantt.bind(method, thisArg);
~~~

### Details

Метод используется в качестве совместимой с IE8 замены функции [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

### Change log
- добавлено в версии 4.0