---
sidebar_label: order_branch
title: order_branch config
description: "ermöglicht den 'branch'-Modus zum vertikalen Umordnen von Aufgaben innerhalb derselben Tree-Ebene"
---

# order_branch

### Description

@short: Ermöglicht den 'branch'-Modus zum vertikalen Umordnen von Aufgaben innerhalb derselben Tree-Ebene

@signature: order_branch: string | boolean

### Example

~~~jsx
gantt.config.order_branch = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

Diese Einstellung erlaubt es, Aufgaben neu anzuordnen, während sie auf ihrer aktuellen Tree-Ebene bleiben. Beispielsweise bleibt eine Unteraufgabe eine Unteraufgabe und wird nicht zu einer übergeordneten Aufgabe.

## Leistungssteigerung

Bei einer großen Anzahl von Aufgaben kann das standardmäßige Branch-Reordering die Performance verlangsamen.
Zur Verbesserung der Leistung kann man in den **"marker"**-Modus wechseln.

~~~js
gantt.config.order_branch = "marker";
~~~

:::note
sample [Branch ordering - highlighting mode](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html) 
:::

In diesem Modus wird nur der Name der Aufgabe beim Halten der linken Maustaste verschoben, und das Gantt-Chart wird erst aktualisiert, wenn die Aufgabe an ihrer neuen Position abgelegt wird (wenn die Taste losgelassen wird).
Im Gegensatz zum Standardmodus löst das Verschieben von Aufgaben auf diese Weise nicht die Events onBeforeTaskMove oder onAfterTaskMove aus.

Wenn Sie das Ablegen einer Aufgabe an bestimmten Positionen blockieren möchten, verwenden Sie das Event [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) (dies funktioniert nur im "marker"-Modus).

### Related API
- [order_branch_free](api/config/order_branch_free.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
- [onBeforeRowDragMove](api/event/onbeforerowdragmove.md)

### Related Guides
- ["Aufgaben neu anordnen"](guides/reordering-tasks.md)

