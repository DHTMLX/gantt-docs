---
sidebar_label: getTaskNode
title: getTaskNode Methode
description: "gibt das HTML-Element der Aufgabenleiste zurück"
---

# getTaskNode

### Description

@short: Gibt das HTML-Element der Aufgabenleiste zurück

@signature: getTaskNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    die Aufgaben-ID

### Returns
- `node` - (HTMLElement) - das HTML-Element der Aufgabenleiste

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.getTaskNode(10);//-><div task_id=​"2" class=​"gantt_task_line" ​…​​>​​…​</div>​
~~~

### Details

Bitte beachten Sie, dass beim Neuzeichnen einer Aufgabe das alte DOM-Element verworfen und durch ein neues Element ersetzt wird. Das bedeutet, dass alle Änderungen, die Sie am Element vorgenommen haben, nach der nächsten Neuzeichnung zurückgesetzt werden.

Wenn Sie das Erscheinungsbild eines Elements ändern müssen, empfehlen wir die Verwendung von Templates, da sie die bevorzugte Methode zur Anpassung des Aussehens von Gantt-Elementen sind.

### Related API
- [getTaskRowNode](api/method/gettaskrownode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)