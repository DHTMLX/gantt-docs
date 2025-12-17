---
sidebar_label: timeline_cell_content
title: timeline_cell_content template
description: "Ermöglicht das Festlegen von benutzerdefiniertem HTML-Inhalt innerhalb von Timeline-Zellen"
---

# timeline_cell_content

### Description

@short: Ermöglicht das Festlegen von benutzerdefiniertem HTML-Inhalt innerhalb von Timeline-Zellen

@signature: timeline_cell_content: (task: Task, date: Date) =\> string | number | void;

### Parameters

- `task` - (required) *Task* - Das Task-Objekt
- `date` - (required) *Date* - Das Datum, das der Zelle entspricht

### Returns
- ` text` - (string | number | void) - Ein HTML-String

### Example

~~~jsx
gantt.templates.timeline_cell_content = function (task, date) {
    if (gantt.getTaskType(task) === "task"){
        const cost = calculateSlotCost(task, date);
        return `<div class='cost'>${demoValue}</div>`;
    }
    return "";
};
~~~

### Related samples
- [Custom content inside the timeline cells](https://docs.dhtmlx.com/gantt/samples/04_customization/24_timeline_cells_custom_content.html)

### Details

:::note
 Diese Template-Option ist der [addTaskLayer()](guides/baselines.md) Methode vorzuziehen, wenn Sie benutzerdefinierten Inhalt innerhalb von Timeline-Zellen anzeigen möchten. Sie ist einfacher zu implementieren und bietet bessere Performance. 
:::

Beachten Sie, dass der benutzerdefinierte Inhalt *unterhalb* der Task-Balken angezeigt wird, da die Task-Balken einen höheren z-index besitzen. Das bedeutet, dass der Inhalt möglicherweise verdeckt wird, wenn ein Task-Balken die Zelle überlappt.

Wenn Sie möchten, dass der benutzerdefinierte Inhalt über den Task-Balken angezeigt wird, können Sie Ihrem benutzerdefinierten Element einen höheren 'z-index' zuweisen:

~~~html
<style>
    .cost{
        position:absolute;
        z-index: 5;
        pointer-events: none; 
    }
</style>
~~~

### Related API
- [addTaskLayer](api/method/addtasklayer.md)

### Related Guides
- ["Vorlagen für den Timeline-Bereich"](guides/timeline-templates.md)
- ["Benutzerdefinierte Elemente im Timeline-Bereich"](guides/baselines.md)

### Change log
- hinzugefügt in v8.0

