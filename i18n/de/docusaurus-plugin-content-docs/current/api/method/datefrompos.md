---
sidebar_label: dateFromPos
title: dateFromPos method
description: "ermittelt das Datum, das einer gegebenen horizontalen Position innerhalb des Chartbereichs entspricht"
---

# dateFromPos

### Description

@short: Ermittelt das Datum, das einer gegebenen horizontalen Position innerhalb des Chartbereichs entspricht

@signature: dateFromPos: (pos: number) =\> Date

### Parameters

- `pos` - (required) *number* - die relative horizontale Position, für die das Datum ermittelt werden soll

### Returns
- ` date` - (Date) - das Datum, das der angegebenen horizontalen Position im Chartbereich entspricht

### Example

~~~jsx
var date = gantt.dateFromPos(200);
~~~

### Details

:::note

Diese Methode gibt ein Datum zurück, das aktuell im Gantt-Chart sichtbar ist. Wenn das Datum an der angegebenen Position nicht im Chart angezeigt wird, wird 'null' zurückgegeben.
 
:::

![gantt_localized](/img/gantt_localized.png)

Als Beispiel liefert die Methode für den oben gezeigten Gantt-Chart Folgendes zurück:

~~~js
gantt.dateFromPos(0); // -> Sun Mar 31 2013 00:00:00
gantt.dateFromPos(74);  // -> Mon Apr 01 2013 01:22:17
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)

