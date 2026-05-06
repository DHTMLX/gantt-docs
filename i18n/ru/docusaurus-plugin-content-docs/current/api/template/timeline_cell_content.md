---
sidebar_label: timeline_cell_content
title: timeline_cell_content template
description: "Указывается настраиваемый HTML-контент в timeline-ячейках"
---

# timeline_cell_content

### Description

@short: Указывает настраиваемый HTML-контент в timeline-ячейках

@signature: timeline_cell_content: (task: Task, date: Date) =\> string | number | void;

### Parameters

- `task` - (required) *Task* - объект задачи
- `date` - (required) *Date* - дата ячейки

### Returns
- ` text` - (string | number | void) - HTML-строка

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
- [Пользовательский контент внутри timeline-ячейки](https://docs.dhtmlx.com/gantt/samples/04_customization/24_timeline_cells_custom_content.html)

### Details

:::note
Рекомендуется использовать этот шаблон вместо метода [addTaskLayer()] (guides/baselines.md) в случаях, когда вам нужно показать настраиваемый контент в ячейках timeline. Это будет проще реализовать и быстрее по производительности.
:::

Примечание: настраиваемый контент будет отображаться *ниже* полос задач, что означает, что полосы задач будут иметь более высокий z-index, и содержимое ячеек не будет видно, когда полоса задачи находится над ним.
Если вам нужно, чтобы контент был видим поверх полосы, вы можете задать 'z-index' для настраиваемого элемента:

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
- [Шаблоны Timeline Area](guides/timeline-templates.md)
- [Пользовательские элементы в Timeline Area](guides/baselines.md)

### Change log
- добавлено в версии v8.0