---
sidebar_label: posFromDate
title: posFromDate method
description: "Ermittelt die relative horizontale Position des angegebenen Datums im Diagrammbereich"
---

# posFromDate

### Description

@short: Ermittelt die relative horizontale Position des angegebenen Datums im Diagrammbereich

@signature: posFromDate: (date: Date) =\> number

### Parameters

- `date` - (required) *Date* - ein Datum, dessen Position Sie ermitteln möchten

### Returns
- ` position` - (number) - x-Koordinate (in Pixeln) des angegebenen Datums in der Timeline

### Example

~~~jsx
gantt.posFromDate(new Date());
~~~

### Details

:::note
Die Methode gibt die Position eines Datums zurück, das derzeit im Gantt-Diagramm gerendert wird. Wenn ein Datum im Diagramm nicht gerendert wird - gibt die Methode 'null' zurück.
:::

Beispiel: Für das oben gezeigte Gantt-Diagramm gibt die Methode Folgendes zurück:

~~~js
gantt.posFromDate(new Date(2023,02,31)); // -> 0
gantt.posFromDate(new Date(2023,03,1));  // -> 74
gantt.posFromDate(new Date(2023,03,2));  // -> 148
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)