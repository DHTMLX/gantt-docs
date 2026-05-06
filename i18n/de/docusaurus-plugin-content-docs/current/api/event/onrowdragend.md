---
sidebar_label: onRowDragEnd
title: onRowDragEnd event
description: "wird ausgelöst, nachdem der Benutzer eine vertikal neu geordnete Zeile im Grid abgelegt hat"
---

# onRowDragEnd

### Description

@short: Wird ausgelöst, nachdem der Benutzer eine vertikal neu geordnete Zeile im Grid abgelegt hat

@signature: onRowDragEnd: (id: string | number, target: string | number) =\> void;

### Parameters

- `id` - (erforderlich) *string | number* - die ID der Aufgabe, die der Benutzer im Grid vertikal gezogen hat
- `target` - (erforderlich) *string | number* - die ID der Aufgabe, die durch die Platzierung der gezogenen Zeile eingenommen wurde

### Example

~~~jsx
gantt.attachEvent("onRowDragEnd", function(id, target) {
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note
Die Veranstaltung wird ausgelöst, wenn eine Aufgabe mit der Maus im linken Grid verschoben wird, während die Einstellung [order_branch](api/config/order_branch.md) aktiviert ist. Wenn das Neuanordnen von Verzweigungen deaktiviert ist, wird das Ereignis niemals ausgelöst.
:::

Der **target**-Parameter enthält die ID der nächsten Aufgabe, die direkt vor bzw. direkt nach der aktuellen Aufgabe liegt.

Der Wert kann in einem von zwei Formaten vorliegen:

- *target=targetId* - die aktuelle Aufgabe sollte direkt vor der Aufgabe mit der ID targetId liegen
- *target=next:targetId* - die aktuelle Aufgabe sollte direkt nach der Aufgabe mit der ID targetId platziert werden (tritt auf, wenn Sie die letzte Aufgabe im Diagramm ersetzen)

Ein Beispiel zum Abrufen der ID eines Targets im Format *next:targetId*:

~~~js
gantt.attachEvent("onRowDragEnd", function(id, target) {
      if(typeof(target) === "string"){
        targetTaskId  = target.substr("next:".length);
        nextTask = true;
      } else {
        targetTaskId  = target;
        nextTask = false;
      }
});
~~~

### Related API
- [onBeforeRowDragEnd](api/event/onbeforerowdragend.md)
- [onRowDragStart](api/event/onrowdragstart.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Reordering Tasks](guides/reordering-tasks.md)