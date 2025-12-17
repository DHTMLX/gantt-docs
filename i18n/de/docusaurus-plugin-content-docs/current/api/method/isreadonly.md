---
sidebar_label: isReadonly
title: isReadonly method
description: "bestimmt, ob eine bestimmte Aufgabe, ein Link oder das gesamte Gantt-Diagramm auf read-only gesetzt ist"
---

# isReadonly

### Description

@short: Bestimmt, ob eine bestimmte Aufgabe, ein Link oder das gesamte Gantt-Diagramm auf read-only gesetzt ist

@signature: isReadonly: (item?: number | string | Task | Link) =\> boolean

### Parameters
- `item` - (optional) *	number | string | Task | Link* -  optional, die ID oder das Objekt, das die Aufgabe/den Link repräsentiert. Wenn ausgelassen, prüft die Methode, ob das gesamte Gantt read-only ist

### Returns
- ` mode` - (boolean) - <i>true</i>, wenn die angegebene Aufgabe/der Link oder das gesamte Gantt read-only ist; andernfalls <i>false</i>

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2023",
    duration:28
}, "project_2");

gantt.isReadonly(10); // ->false

// oder 
gantt.isReadonly(gantt.getTask(10)); // -> false
~~~

### Related Guides
- ["Schreibgeschützter Modus"](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)
