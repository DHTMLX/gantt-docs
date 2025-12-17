---
sidebar_label: timeline_cell_content
title: timeline_cell_content template
description: "specifies custom HTML content in the timeline cells"
---

# timeline_cell_content

### Description

@short: Specifies custom HTML content in the timeline cells

@signature: timeline_cell_content: (task: Task, date: Date) =\> string | number | void;

### Parameters

- `task` - (required) *Task* - the task's object
- `date` - (required) *Date* - the date of a cell

### Returns
- ` text` - (string | number | void) - an HTML string

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
You should use this template instead of the [addTaskLayer()](guides/baselines.md) method in cases when you need to show custom content in cells of the timeline. It will be easier to implement and faster in performance. 
:::

Note, that the custom content will be displayed *below* the task bars, meaning the task bars will have higher z-index and the content of cells won't be visible when the task bar is located on top of it.
If you need the content to be visible over the bar, you can add 'z-index' to the custom element:

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
- [Templates of the Timeline Area](guides/timeline-templates.md)
- [Custom Elements in Timeline Area](guides/baselines.md)

### Change log
- added in v8.0

