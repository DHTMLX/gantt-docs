---
sidebar_label: onBeforeRowDragMove
title: onBeforeRowDragMove event
description: "löst aus, bevor eine Zeile des Grids vertikal an eine andere Position gezogen wird"
---

# onBeforeRowDragMove

### Description

@short: Löst aus, bevor eine Zeile des Grids vertikal an eine andere Position gezogen wird

@signature: onBeforeRowDragMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe, die im Grid verschoben werden soll
- `parent` - (required) *string | number* - die Eltern-ID
- `tindex` - (required) *number* - der Index der Position im übergeordneten Zweig, zu dem die Aufgabe verschoben wird

### Returns
- `result` - (boolean) - definiert, ob die Standardaktion des Ereignisses ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowDragMove", function(id, parent, tindex){
     // return true/false;
});
~~~

### Details

Das Event ist blockierbar. Geben Sie false zurück, um das Verschieben einer Zeile abzubrechen.

:::note
Dieses Ereignis wird nur ausgelöst, wenn die Option [order_branch](api/config/order_branch.md) auf den Wert "marker" gesetzt ist.
::: 

### Related API
- [order_branch](api/config/order_branch.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)