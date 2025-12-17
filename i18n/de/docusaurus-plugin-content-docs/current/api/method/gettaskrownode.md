---
sidebar_label: getTaskRowNode
title: getTaskRowNode method
description: "Gibt das HTML-Element zurück, das die Task-Zeile in der Tabelle repräsentiert"
---

# getTaskRowNode

### Description

@short: Gibt das HTML-Element zurück, das die Task-Zeile in der Tabelle repräsentiert

@signature: getTaskRowNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    Die ID der Task

### Returns
- `node` - (HTMLElement) - Das HTML-Element, das der Task-Zeile entspricht

### Example

~~~jsx
const taskId = gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2023",
    duration:28
}, "project_2");

gantt.getTaskRowNode(10);//-><div class=​"gantt_row" task_id=​"2">​…​</div>​
~~~

### Details

Beachten Sie, dass beim Aktualisieren und Neuzeichnen einer Task das vorherige DOM-Element verworfen und durch ein neues ersetzt wird. Daher gehen alle direkten Änderungen am Element nach dem nächsten Neuzeichnen verloren.

Für die Anpassung des Erscheinungsbildes von Elementen ist es am besten, Templates zu verwenden, da diese die empfohlene Methode zur Anpassung des Looks von Gantt-Komponenten darstellen.

### Related API
- [getTaskNode](api/method/gettasknode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)

### Related Guides
- ["Spalten festlegen"](guides/specifying-columns.md#datamappingandtemplates)

