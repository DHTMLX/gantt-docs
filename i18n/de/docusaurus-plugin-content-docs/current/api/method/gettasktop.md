---
sidebar_label: getTaskTop
title: getTaskTop-Methode
description: "liefert die obere Position des DOM-Elements der Aufgabe im Timeline-Bereich"
---

# getTaskTop

### Description

@short: Ermittelt die obere Position des DOM-Elements der Aufgabe im Timeline-Bereich

@signature: getTaskTop: (id: number | string) =\> number

### Parameters

- `id` - (required) *number | string* -    die ID der Aufgabe

### Returns
- `top` - (number) - die CSS-Top-Position des DOM-Elements der Aufgabe in Pixeln

### Example

~~~jsx
gantt.getTaskTop(2);
~~~

### Related API
- [getTaskPosition](api/method/gettaskposition.md)