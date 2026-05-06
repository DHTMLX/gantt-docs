---
sidebar_label: getGanttInstance
title: getGanttInstance
description: "a factory object that can be used to create new instances of dhtmlxGantt chart"
---

# getGanttInstance

:::info
Diese Funktionalität ist in der Gantt PRO-Version unter kommerziellen Lizenzen (seit dem 6. Oktober 2021), Enterprise- und Ultimate-Lizenzen verfügbar.
:::

### Description

@short: A factory object that can be used to create new instances of dhtmlxGantt chart

### Example

~~~jsx
// kann als globales Objekt verwendet werden
const myGantt = Gantt.getGanttInstance();

// oder importiert aus `dhtmlxgantt.js` als Modul
import { Gantt } from 'dhtmlx-gantt';
...
const myGantt = Gantt.getGanttInstance();
~~~

## Methoden

- **getGanttInstance(ganttConfig)** - erstellt eine neue Instanz von dhtmlxGantt. Folgender Parameter wird verwendet:
    - **ganttConfig** - (*object*) optional, ein [Konfigurationsobjekt](guides/multiple-gantts.md#gantt-instance-configuration) für eine neue Gantt-Instanz

Beispiel:

~~~js
const myGantt = Gantt.getGanttInstance();
~~~

Wenn eine Instanz nicht mehr benötigt wird, kann sie mit der `destructor()`-Methode der Instanz zerstört werden, zum Beispiel:

~~~js
const myGantt = Gantt.getGanttInstance();
...
myGantt.destructor();
~~~