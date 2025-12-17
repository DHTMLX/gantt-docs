---
sidebar_label: posFromDate
title: posFromDate method
description: "ermittelt die relative horizontale Position eines angegebenen Datums innerhalb des Chartbereichs"
---

# posFromDate

### Description

@short: Ermittelt die relative horizontale Position eines angegebenen Datums innerhalb des Chartbereichs

@signature: posFromDate: (date: Date) =\> number

### Parameters

- `date` - (required) *Date* - das Datum, für das die Position benötigt wird

### Returns
- ` position` - (number) - die x-Koordinate (in Pixel) des angegebenen Datums auf der Zeitachse

### Example

~~~jsx
gantt.posFromDate(new Date());
~~~

### Details

:::note

Diese Methode liefert die Position eines Datums, das aktuell im Gantt-Chart angezeigt wird. Ist das Datum im Chart nicht sichtbar, gibt sie 'null' zurück.
 
:::

![gantt_localized](/img/gantt_localized.png)

Für das oben gezeigte Gantt-Chart liefert die Methode folgende Ergebnisse:

~~~js
gantt.posFromDate(new Date(2023,02,31)); // -> 0
gantt.posFromDate(new Date(2023,03,1));  // -> 74
gantt.posFromDate(new Date(2023,03,2));  // -> 148
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)

