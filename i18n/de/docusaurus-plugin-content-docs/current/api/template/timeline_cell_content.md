---
sidebar_label: timeline_cell_content
title: timeline_cell_content template
description: "gibt benutzerdefinierten HTML-Inhalt in den Timeline-Zellen fest"
---

# timeline_cell_content

### Description

@short: Ermöglicht das Festlegen von benutzerdefiniertem HTML-Inhalt innerhalb von Timeline-Zellen

@signature: timeline_cell_content: (task: Task, date: Date) =\> string | number | void;

### Parameters

- `task` - (erforderlich) *Task* - das Objekt der Aufgabe
- `date` - (erforderlich) *Date* - das Datum der Zelle

### Returns
- ` text` - (string | number | void) - ein HTML-String

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
- [Benutzerdefinierte Inhalte in den Timeline-Zellen](https://docs.dhtmlx.com/gantt/samples/04_customization/24_timeline_cells_custom_content.html)

### Details

:::note
Sie sollten diese Vorlage anstelle der Methode [addTaskLayer()](guides/baselines.md) verwenden, wenn Sie benutzerdefinierten Inhalt in den Zellen der Timeline anzeigen müssen. Die Implementierung ist einfacher und die Leistung schneller.
:::

Beachten Sie, dass der benutzerdefinierte Inhalt *unter* den Aufgabenbalken angezeigt wird, was bedeutet, dass der Balken der Aufgaben einen höheren z-Index hat und der Inhalt der Zellen nicht sichtbar ist, wenn der Balken darüber liegt.
Wenn Sie möchten, dass der Inhalt über dem Balken sichtbar ist, können Sie dem benutzerdefinierten Element 'z-index' hinzufügen:

~~~css
    .cost{
        position:absolute;
        z-index: 5;
        pointer-events: none; 
    }
~~~

### Related API
- [addTaskLayer](api/method/addtasklayer.md)

### Related Guides
- [Vorlagen des Timeline-Bereichs](guides/timeline-templates.md)
- [Benutzerdefinierte Elemente im Timeline-Bereich](guides/baselines.md)

### Change log
- hinzugefügt in v8.0