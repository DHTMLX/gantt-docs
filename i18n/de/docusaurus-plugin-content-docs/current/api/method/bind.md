---
sidebar_label: bind
title: Bind-Methode
description: "erstellt eine neue Funktion, die beim Aufrufen ihren <i>this</i>-Kontext auf den angegebenen Wert setzt"
---

# bind

### Description

@short: Erstellt eine neue Funktion, die beim Aufrufen ihren <i>this</i>-Kontext auf den angegebenen Wert setzt

@signature: bind: (method: GanttCallback, thisArg: any) =\> GanttCallback

### Parameters

- `method` - (erforderlich) *Funktion* - die Ziel-Funktion
- `thisArg` - (erforderlich) *Objekt* - der Wert, der als <i>this</i>-Parameter an die Ziel-Funktion übergeben wird, wenn die gebundene Funktion aufgerufen wird

### Returns
- ` bound_function` - (function) - eine neue Funktion, die beim Aufruf ihr <i>this</i>-Schlüsselwort hat, das an die Ziel-Funktion übergeben wird

### Example

~~~jsx
gantt.bind(method, thisArg);
~~~

### Details

Die Methode wird als IE8-kompatibler Ersatz für die Funktion
[Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 
verwendet.

### Change log
- in Version 4.0 hinzugefügt