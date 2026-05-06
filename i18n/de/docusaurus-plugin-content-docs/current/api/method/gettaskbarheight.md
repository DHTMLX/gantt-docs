---
sidebar_label: getTaskBarHeight
title: getTaskBarHeight Methode
description: "gibt die Höhe (in Pixeln) des DOM-Elements der Aufgabe zurück"
---

# getTaskBarHeight

### Description

@short: Gibt die Höhe (in Pixeln) des DOM-Elements der Aufgabe zurück

@signature: getTaskBarHeight: (taskId: number | string) =\> number

### Parameters

- `taskId` - (required) *number | string* - Die ID der Aufgabe

### Returns
- ` param` - (number) - die Höhe der Aufgabe

### Example

~~~jsx
gantt.config.bar_height = 45;
gantt.render();

gantt.getTaskBarHeight(1); // -> 45
~~~

### Details

Der Rückgabewert kann auch dem Wert entsprechen, der der **bar_height**-Eigenschaft des Task-Objekts zugewiesen ist:

~~~js
const tasks = {
      data:[
         { id: 1, text: "Project #2", start_date: "01-04-2018", duration: 18, 
             progress: 0.4, open: true, bar_height: "full", row_height: 50 }, 
        { id: 2, text: "Task #1", start_date: "02-04-2018", duration: 8, 
            progress: 0.6, parent: 1, bar_height: 25, row_height: 50 },
       ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getTaskBarHeight(1); // -> 45
gantt.getTaskBarHeight(2); // -> 25
~~~

:::note
Wenn die **bar_height**-Eigenschaft auf "full" gesetzt ist, berechnet die Methode die Höhe der Task-Leiste in Pixeln.
:::

### Related API
- [bar_height](api/config/bar_height.md)

### Related Guides
- [Resizing Rows in Grid](guides/resizing-rows.md)
- [Task Object/Id](guides/task-object-operations.md#task-height)

### Change log
- Hinzugefügt in v7.1