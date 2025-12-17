---
sidebar_label: callEvent
title: callEvent method
description: "löst ein internes Event aus"
---

# callEvent

### Description

@short: Löst ein internes Event aus

@signature: callEvent: (name: string, params?: any[]) =\> boolean

### Parameters

- `name` - (required) *string* - der Name des Events, Groß-/Kleinschreibung wird nicht beachtet
- `params` - (optionale) *array* - optionale Parameter, ein Array mit datenbezogenen Informationen zum Event

### Returns
- ` result` - (boolean) - <i>false</i>, wenn einer der Event-Handler <i>false</i> zurückgibt. Andernfalls <i>true</i>

### Example

~~~jsx
gantt.attachEvent("CustomEvent", function(param1, param2){
    return true;
});

var res = gantt.callEvent("CustomEvent", [param1, param2]);
~~~

### Details

Normalerweise werden Events automatisch ausgelöst, daher ist es in der Regel nicht notwendig, diese Methode manuell aufzurufen.
