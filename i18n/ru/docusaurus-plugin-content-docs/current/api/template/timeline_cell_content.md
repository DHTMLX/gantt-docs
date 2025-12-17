---
sidebar_label: timeline_cell_content
title: timeline_cell_content template
description: "позволяет задавать пользовательский HTML-контент внутри ячеек timeline"
---

# timeline_cell_content

### Description

@short: Позволяет задавать пользовательский HTML-контент внутри ячеек timeline

@signature: timeline_cell_content: (task: Task, date: Date) =\> string | number | void;

### Parameters

- `task` - (required) *Task* - объект задачи
- `date` - (required) *Date* - дата, соответствующая ячейке

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
- [Custom content inside the timeline cells](https://docs.dhtmlx.com/gantt/samples/04_customization/24_timeline_cells_custom_content.html)

### Details

:::note
note Этот шаблон предпочтительнее использовать вместо метода [addTaskLayer()](guides/baselines.md), если вы хотите отображать пользовательский контент внутри ячеек timeline. Он проще в реализации и обеспечивает лучшую производительность. 
:::

Учтите, что пользовательский контент будет отображаться *под* полосами задач, поэтому полосы задач имеют более высокий z-index. Это значит, что контент может быть скрыт, если полоса задачи перекрывает ячейку.

Если вы хотите, чтобы пользовательский контент отображался поверх полос задач, можно задать более высокий 'z-index' для вашего пользовательского элемента:

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
- [Шаблоны области временной шкалы](guides/timeline-templates.md)
- [Пользовательские элементы в области временной шкалы](guides/baselines.md)

### Change log
- добавлено в версии v8.0

