---
sidebar_label: callEvent
title: callEvent Methode
description: "ruft ein inneres Event auf"
---

# callEvent

### Description

@short: Ruft ein inneres Event auf

@signature: callEvent: (name: string, params?: any[]) =\> boolean

### Parameters

- `name` - (erforderlich) *string* - der Name des Events, Groß-/Kleinschreibung wird ignoriert
- `params` - (optional) *array* - ein Array der zum Event gehörenden Daten

### Returns
- ` result` - (boolean) - <i>false</i>, falls einige der Event-Handler <i>false</i> zurückgeben. Andernfalls <i>true</i>

### Example

~~~jsx
gantt.attachEvent("CustomEvent", function(param1, param2){
    return true;
});

var res = gantt.callEvent("CustomEvent", [param1, param2]);
~~~

### Details

Normalerweise werden Ereignisse automatisch aufgerufen, und Sie müssen diese Methode nicht verwenden.