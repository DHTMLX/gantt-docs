---
sidebar_label: bind
title: bind method
description: "erstellt eine neue Funktion, die beim Aufruf ihr <i>this</i>-Schlüsselwort auf den angegebenen Wert setzt"
---

# bind

### Description

@short: Erstellt eine neue Funktion, die beim Aufruf ihr <i>this</i>-Schlüsselwort auf den angegebenen Wert setzt

@signature: bind: (method: GanttCallback, thisArg: any) =\> GanttCallback

### Parameters

- `method` - (required) *function* - die Funktion, die gebunden werden soll
- `thisArg` - (required) *object* - der Wert, der als <i>this</i>-Kontext verwendet wird, wenn die gebundene Funktion aufgerufen wird

### Returns
- ` bound_function` - (function) - eine neue Funktion, die beim Aufruf den angegebenen <i>this</i>-Wert für die ursprüngliche Funktion verwendet

### Example

~~~jsx
gantt.bind(method, thisArg);
~~~

### Details

Diese Methode dient als IE8-kompatible Alternative zur
[Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 
Funktion.

### Change log
- hinzugefügt in Version 4.0
