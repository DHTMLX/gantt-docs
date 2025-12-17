---
sidebar_label: onBeforeRowDragMove
title: onBeforeRowDragMove event
description: "wird ausgelöst, kurz bevor eine Zeile im Grid vertikal an eine neue Position gezogen wird"
---

# onBeforeRowDragMove

### Description

@short: Wird ausgelöst, kurz bevor eine Zeile im Grid vertikal an eine neue Position gezogen wird

@signature: onBeforeRowDragMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe, die innerhalb des Grids verschoben wird
- `parent` - (required) *string | number* - die ID des neuen Elternteils
- `tindex` - (required) *number* - der Zielindex innerhalb des Elternzweigs, an dem die Aufgabe platziert wird

### Returns
- ` result` - (boolean) - gibt an, ob die Standardaktion des Events fortgesetzt werden soll (<b>true</b>) oder gestoppt wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowDragMove", function(id, parent, tindex){
    // return true/false;
});
~~~

### Details

Dieses Event kann blockiert werden. Die Rückgabe von *false* verhindert, dass die Zeile verschoben wird.

:::note
 Dieses Event wird nur ausgelöst, wenn die Option [order_branch](api/config/order_branch.md) auf "marker" gesetzt ist. 
:::

### Related API
- [order_branch](api/config/order_branch.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)

