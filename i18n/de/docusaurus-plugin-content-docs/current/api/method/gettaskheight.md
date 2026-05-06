---
sidebar_label: getTaskHeight
title: getTaskHeight Methode
description: "liefert die sichtbare Höhe einer Aufgabe"
---

# getTaskHeight

### Description

@short: Gibt die sichtbare Höhe einer Aufgabe zurück

@signature: getTaskHeight: (id?: string | number) =\> number

### Parameters
- `task` - (optional) *string | number* - die ID der Aufgabe

### Returns
- ` height` - (number) - die Höhe der angegebenen Aufgabe oder, falls der <i>id</i>-Parameter nicht angegeben ist, die Höhe der Aufgaben

### Example

~~~jsx
const height = gantt.getTaskHeight(); // -> 30
~~~