---
sidebar_label: getTaskHeight
title: getTaskHeight method
description: "bietet die sichtbare Höhe einer Aufgabe"
---

# getTaskHeight

### Description

@short: Bietet die sichtbare Höhe einer Aufgabe

@signature: getTaskHeight: (id?: string | number) =\> number

### Parameters
- `id` - (optional) *string | number* - die ID der Aufgabe

### Returns
- ` height` - (number) - die Höhe der angegebenen Aufgabe oder, falls der Parameter <i>id</i> nicht übergeben wird, die Höhe der Aufgaben

### Example

~~~jsx
const height = gantt.getTaskHeight(); // -> 30
~~~
