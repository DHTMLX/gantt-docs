---
sidebar_label: getTaskNode
title: getTaskNode method
description: "ruft das HTML-Element ab, das der Task-Leiste entspricht"
---

# getTaskNode

### Description

@short: Ruft das HTML-Element ab, das der Task-Leiste entspricht

@signature: getTaskNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    die Aufgaben-ID

### Returns
- `node` - (HTMLElement) - das HTML-Element, das die Task-Leiste repräsentiert

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

Beachte, dass jedes Mal, wenn eine Aufgabe neu gezeichnet wird, das vorherige DOM-Element verworfen und durch ein neues ersetzt wird. Das bedeutet, dass direkte Änderungen am Element nach dem nächsten Update verloren gehen.

Für die Anpassung des Aussehens von Elementen ist es am besten, Templates zu verwenden, da sie eine zuverlässige Methode bieten, um das Erscheinungsbild der Gantt-Komponenten anzupassen.

### Related API
- [getTaskRowNode](api/method/gettaskrownode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)

