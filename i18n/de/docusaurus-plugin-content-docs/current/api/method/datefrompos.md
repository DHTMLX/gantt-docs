---
sidebar_label: dateFromPos
title: dateFromPos method
description: "liefert das Datum der angegebenen horizontalen Position im Diagrammbereich"
---

# dateFromPos

### Description

@short: Liefert das Datum der angegebenen horizontalen Position im Diagrammbereich

@signature: dateFromPos: (pos: number) =\> Date

### Parameters

- `pos` - (erforderlich) *number* - die relative horizontale Position, zu der Sie das Datum ermitteln möchten

### Returns
- ` date` - (Date) - das Datum der angegebenen horizontalen Position im Diagrammbereich

### Example

~~~jsx
var date = gantt.dateFromPos(200);
~~~

### Details

:::note
Die Methode gibt ein Datum zurück, das derzeit im Gantt-Diagramm gerendert wird. Falls kein Datum im Diagramm gerendert wird - gibt die Methode 'null' zurück.
:::

Beispielsweise gibt die Methode beim obigen Gantt-Diagramm Folgendes zurück:

~~~js
gantt.dateFromPos(0); // -> Sun Mar 31 2013 00:00:00
gantt.dateFromPos(74);  // -> Mon Apr 01 2013 01:22:17
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)