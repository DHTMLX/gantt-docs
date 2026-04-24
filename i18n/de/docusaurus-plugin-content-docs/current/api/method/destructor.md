---
sidebar_label: destructor
title: destructor method
description: "bereinigt die Gantt-Instanz"
---

# destructor

### Description

@short: Zerstört die Gantt-Instanz

@signature: destructor: () =\> void

### Example

~~~jsx
const myGantt = Gantt.getGanttInstance();

// Entfernen einer Gantt-Instanz
myGantt.destructor();
~~~

### Details

Die Methode zerstört eine Gantt-Instanz und löst das [onDestroy](api/event/ondestroy.md) Event aus.

Das Aufrufen eines Destruktors bewirkt Folgendes:

- löscht die in einer Gantt-Instanz geladenen Daten
- löscht den [dataProcessor] (falls er mit der Gantt-Instanz verbunden ist)
- trennt die Gantt-Instanz vom DOM
- trennt alle DOM-Ereignisse, die über die Methoden [event](api/method/event.md) und [attachEvent](api/method/attachevent.md) an das DOM angehängt wurden

:::note
Wenn Sie ein Paket verwenden, das das Erstellen mehrerer Instanzen eines Gantt nicht zulässt (GPL- oder Individualeditionen), macht der Aufruf des Destruktors die Gantt-Instanz bis zum Neuladen der Seite unzugänglich.
:::

### Related API
- [onDestroy](api/event/ondestroy.md)

### Related Guides
- ["Mehrere Diagramme auf einer Seite"](guides/multiple-gantts.md#destructorofganttanddataprocessorinstances)

### Change log
- hinzugefügt in Version 5.1