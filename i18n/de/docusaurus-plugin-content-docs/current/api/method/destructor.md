---
sidebar_label: destructor
title: destructor method
description: "bereinigt die Gantt-Instanz"
---

# destructor

### Description

@short: Bereinigt die Gantt-Instanz

@signature: destructor: () =\> void

### Example

~~~jsx
const myGantt = Gantt.getGanttInstance();

// Entfernen einer Gantt-Instanz
myGantt.destructor();
~~~

### Details

Diese Methode bereinigt eine Gantt-Instanz und löst das Event [onDestroy](api/event/ondestroy.md) aus.

Wenn der destructor aufgerufen wird, wird er:

- alle in die Gantt-Instanz geladenen Daten löschen
- den [dataProcessor](api/method/dataprocessor.md) entfernen, falls dieser mit dem Gantt verknüpft war
- das Gantt vom DOM trennen
- alle über die [event](api/method/event.md) Methode hinzugefügten DOM-Event-Handler entfernen

:::note

Wenn Sie ein Paket verwenden, das keine mehreren Gantt-Instanzen unterstützt (wie die GPL- oder Individual-Editionen), wird das Aufrufen des destructors das Gantt unzugänglich machen, bis die Seite neu geladen wird.
 
:::

### Related API
- [onDestroy](api/event/ondestroy.md)

### Related Guides
- ["Mehrere Diagramme auf einer Seite"](guides/multiple-gantts.md#destructorofganttanddataprocessorinstances)

### Change log
- hinzugefügt in Version 5.1

