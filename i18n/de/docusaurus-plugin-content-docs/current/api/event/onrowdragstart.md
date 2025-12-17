---
sidebar_label: onRowDragStart
title: onRowDragStart event
description: "Wird unmittelbar ausgelöst, bevor eine Zeile im Grid für die vertikale Neuordnung gezogen wird."
---

# onRowDragStart

### Description

@short: Wird unmittelbar ausgelöst, bevor eine Zeile im Grid für die vertikale Neuordnung gezogen wird.

@signature: onRowDragStart: (id: string | number, target: HTMLElement, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe, die innerhalb des Grids gezogen wird
- `target` - (required) *HTMLElement* - das HTML-Element, das die gezogene Aufgabe repräsentiert
- `e` - (required) *Event* - das native Event-Objekt, das mit der Drag-Aktion verbunden ist

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder gestoppt wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    //benutzerdefinierte Logik kann hier hinzugefügt werden
    return true;
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note

Dieses Event wird ausgelöst, wenn eine Aufgabe mit der Maus innerhalb des linken Grid-Bereichs gezogen wird. Es ist nur anwendbar, wenn die Option [order_branch](api/config/order_branch.md) aktiviert ist. Wenn die Zweig-Neuordnung deaktiviert ist, tritt dieses Event nicht auf.
 
:::

Dieses Event kann durch Rückgabe von *false* blockiert werden, wodurch das Starten des Ziehvorgangs verhindert wird.

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- ["Aufgaben neu anordnen"](guides/reordering-tasks.md)

