---
sidebar_label: isCriticalTask
title: isCriticalTask Methode
description: "prüft, ob die angegebene Aufgabe kritisch ist"
---

# isCriticalTask

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Prüft, ob die angegebene Aufgabe kritisch ist

@signature: isCriticalTask: (task: Task) => boolean

### Parameters

- `task` - (erforderlich) *Task* - das Objekt der Aufgabe

### Returns
- `value` - (boolean) - 'true' если die angegebene Aufgabe kritisch ist, 'false' ansonsten

### Example

~~~jsx
const tasks = {
    data:[
       {id:1, text:"Project #1", start_date:"01-04-2023", duration:18, type:"project"},
       {id:2, text:"Task #1", start_date:"02-04-2023", duration:8, parent:1},
       {id:3, text:"Task #2", start_date:"13-04-2023", duration:8, parent:1}
    ],
    links:[
       {id:1, source:1, target:2, type:"1"},
       {id:2, source:2, target:3, type:"0"}
    ]
};

gantt.config.highlight_critical_path = true; /*!*/
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.isCriticalTask(gantt.getTask(2));// ->'false' /*!*/
gantt.isCriticalTask(gantt.getTask(3));// ->'true' /*!*/
~~~

### Related samples
- [Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::note
Diese Methode ist in der **critical_path**-Erweiterung definiert, daher müssen Sie das [critical_path](guides/extensions-list.md#critical-path) Plugin aktivieren. Lesen Sie die Details im Artikel [Critical Path](guides/critical-path.md).
:::

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalLink](api/method/iscriticallink.md)
- [getSlack](api/method/getslack.md)

### Related Guides
- [Critical Path](guides/critical-path.md)