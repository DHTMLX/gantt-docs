---
sidebar_label: onRowDragStart
title: onRowDragStart-Ereignis
description: "Wird ausgelöst, bevor der Benutzer eine Zeile im Grid zieht, um sie vertikal neu anzuordnen"
---

# onRowDragStart

### Description

@short: Führt aus, bevor der Benutzer eine Zeile des Grids zieht, um sie vertikal neu anzuordnen

@signature: onRowDragStart: (id: string | number, target: HTMLElement, e: Event) =\> boolean;

### Parameters

- `id` - (erforderlich) *string | number* - die ID der Aufgabe, die der Benutzer im Grid zieht
- `target` - (erforderlich) *HTMLElement* - ein HTML-Element der Aufgabe, die der Benutzer zieht
- `e` - (erforderlich) *Event* - ein natives Event-Objekt

### Returns
- `result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note
Das Ereignis wird ausgelöst, wenn eine Aufgabe mit der Maus im linken Grid verschoben wird, während die Einstellung [order_branch](api/config/order_branch.md) aktiviert ist. Wenn die Branch-Reihenfolge deaktiviert ist, wird das Ereignis niemals aufgerufen.
:::

Das Ereignis ist blockierbar. Geben Sie *false* zurück, um das Ziehen abzubrechen.

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Aufgaben neu ordnen](guides/reordering-tasks.md)