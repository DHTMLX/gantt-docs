---
sidebar_label: onRowDragEnd
title: onRowDragEnd event
description: "Wird ausgelöst, nachdem ein Benutzer eine Zeile, die vertikal im Grid neu angeordnet wurde, fallen lässt."
---

# onRowDragEnd

### Description

@short: Wird ausgelöst, nachdem ein Benutzer eine Zeile, die vertikal im Grid neu angeordnet wurde, fallen lässt.

@signature: onRowDragEnd: (id: string | number, target: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe, die vertikal im Grid verschoben wurde
- `target` - (required) *string | number* - die ID der Aufgabe, deren Position die verschobene Zeile eingenommen hat

### Example

~~~jsx
gantt.attachEvent("onRowDragEnd", function(id, target) {
    // benutzerdefinierte Logik kann hier hinzugefügt werden
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note

Dieses Event wird ausgelöst, wenn eine Aufgabe mit der Maus innerhalb des linken Grids verschoben wird, vorausgesetzt, die Einstellung [order_branch](api/config/order_branch.md) ist aktiviert. Wenn die Verzweigungs-Neuanordnung deaktiviert ist, wird dieses Event nicht aufgerufen.
 
:::

Der **target**-Parameter enthält die ID der nächstgelegenen Aufgabe, die entweder unmittelbar vor oder unmittelbar nach der verschobenen Aufgabe steht.

Es gibt zwei mögliche Formate für diesen Wert:

- *target=targetId* - die verschobene Aufgabe soll direkt **vor** der Aufgabe mit targetId platziert werden
- *target=next:targetId* - die verschobene Aufgabe soll direkt **nach** der Aufgabe mit targetId platziert werden (dies passiert, wenn die letzte Aufgabe im Diagramm ersetzt wird)

Hier ein Beispiel, wie die target-ID extrahiert wird, wenn sie im Format *next:targetId* vorliegt:

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
- ["Aufgaben neu anordnen"](guides/reordering-tasks.md)

