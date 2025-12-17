---
sidebar_label: getTaskTop
title: getTaskTop method
description: "Ruft die obere Position des DOM-Elements einer Aufgabe im Timeline-Bereich ab"
---

# getTaskTop

### Description

@short: Ruft die obere Position des DOM-Elements einer Aufgabe im Timeline-Bereich ab

@signature: getTaskTop: (id: number | string) =\> number

### Parameters

- `id` - (required) *number | string* -    Die ID der Aufgabe

### Returns
- ` top` - (number) - Die CSS-Top-Position des DOM-Elements der Aufgabe, gemessen in Pixeln

### Example

~~~jsx
gantt.getTaskTop(2);
~~~

### Related API
- [getTaskPosition](api/method/gettaskposition.md)

