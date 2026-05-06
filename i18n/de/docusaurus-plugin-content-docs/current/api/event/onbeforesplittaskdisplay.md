---
sidebar_label: onBeforeSplitTaskDisplay
title: onBeforeSplitTaskDisplay event
description: "löst aus, bevor ein Teil der gesplitteten Aufgabe im Gantt-Diagramm angezeigt wird"
---

# onBeforeSplitTaskDisplay

### Description

@short: Löst aus, bevor ein Teil der gesplitteten Aufgabe im Gantt-Diagramm angezeigt wird

@signature: onBeforeSplitTaskDisplay: (id: number | string, task: Task, parent: any) =\> boolean;

### Parameters

- `id` - (erforderlich) *number | string* - die ID der Unteraufgabe
- `task` - (erforderlich) *Task* - das Objekt der Unteraufgabe
- `parent` - (erforderlich) *object* - das Objekt der übergeordneten Aufgabe

### Returns
- ` result` - (boolean) - definiert, ob die Unteraufgabe der Split-Aufgabe auf der Seite angezeigt wird (<b>true</b>) oder nicht (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeSplitTaskDisplay", function (id, task, parent) {
    if (task.duration < 3) {
        return false;
    }
    return true;
});
~~~

### Details

![Geteilte Aufgaben](/img/split_tasks.png)

Wenn die Split-Aufgabe gerendert wird, wird zuerst das Ereignis [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) für das übergeordnete Element ausgelöst (eine Aufgabe mit *render:"split"*). Danach wird für jede Unteraufgabe 'onBeforeSplitTaskDisplay' ausgelöst. Die Rückgabe von *false* aus 'onBeforeSplitTaskDisplay' verhindert, dass eine Unteraufgabe angezeigt wird.

:::note
Beispiel: [Split-Aufgaben filtern](https://snippet.dhtmlx.com/3q1yd7iz)
:::

### Related Guides
- [Split Tasks](guides/split-tasks.md)

### Change log
- Hinzugefügt in v8.0