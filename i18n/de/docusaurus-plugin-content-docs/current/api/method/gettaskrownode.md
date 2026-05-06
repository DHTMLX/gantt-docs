---
sidebar_label: getTaskRowNode
title: getTaskRowNode Methode
description: "liefert das HTML-Element der Aufgabenzeile in der Tabelle"
---

# getTaskRowNode

### Description

@short: Gibt das HTML-Element der Aufgabenzeile in der Tabelle zurück

@signature: getTaskRowNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (erforderlich) *string | number* -    die Aufgaben-ID

### Returns
- `node` - (HTMLElement) - das HTML-Element der Aufgabenzeile

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

Bitte beachten Sie, dass bei einer Neuzeichnung der Aufgabe das alte DOM-Element verworfen und durch ein neues Element ersetzt wird. Dies bedeutet, dass alle Änderungen am Element nach der nächsten Neuzeichnung zurückgesetzt werden.

Wenn Sie das Erscheinungsbild eines Elements ändern müssen, empfehlen wir die Verwendung von Templates, da sie die bevorzugte Methode zur Anpassung des Aussehens von Gantt-Elementen sind.

### Related API
- [getTaskNode](api/method/gettasknode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#datamappingandtemplates)