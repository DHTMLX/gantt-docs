---
sidebar_label: isReadonly
title: isReadonly Methode
description: "prüft, ob der angegebene Task/Link oder der gesamte Gantt schreibgeschützt ist"
---

# isReadonly

### Description

@short: Prüft, ob der angegebene Task/Link oder der gesamte Gantt schreibgeschützt ist

@signature: isReadonly: (item?: number | string | Task | Link) =\> boolean

### Parameters

- `item` -	(optional) *number | string | Task | Link*	- optional, die ID oder ein Objekt des Tasks/Links. Falls nicht angegeben, prüft die Methode, ob der Gantt schreibgeschützt ist

### Returns
- ` mode` - (boolean) - <i>true</i>, wenn ein Task/Link oder der Gantt schreibgeschützt ist. Andernfalls <i>false</i>

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
- [Schreibschutz-Modus](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)