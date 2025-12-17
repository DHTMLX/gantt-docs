---
sidebar_label: getTaskBarHeight
title: getTaskBarHeight method
description: "liefert die Höhe (in Pixel) des DOM-Elements der Aufgabe"
---

# getTaskBarHeight

### Description

@short: Liefert die Höhe (in Pixel) des DOM-Elements der Aufgabe

@signature: getTaskBarHeight: (taskId: number | string) =\> number

### Parameters

- `taskId` - (required) *number | string* -    die ID der Aufgabe

### Returns
- ` param` - (number) - die Höhe der Task-Bar

### Example

~~~jsx
gantt.config.bar_height = 45;
gantt.render();

gantt.getTaskBarHeight(1); // -> 45
~~~

### Details

Der zurückgegebene Wert kann der auf dem Aufgabenobjekt gesetzten **bar_height** entsprechen:

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
 
Wenn die Eigenschaft **bar_height** auf "full" gesetzt ist, berechnet diese Methode die tatsächliche Pixelhöhe der Task-Bar. 
:::

### Related API
- [bar_height](api/config/bar_height.md)

### Related Guides
- ["Größenänderung von Zeilen im Grid"](guides/resizing-rows.md)
- ["Task-Objekt/Id"](guides/task-object-operations.md#taskheight)

### Change log
- hinzugefügt in v7.1

