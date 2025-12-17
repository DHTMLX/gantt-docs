---
sidebar_label: timeline_cell_content
title: timeline_cell_content template
description: "允许在 timeline 单元格内指定自定义 HTML 内容"
---

# timeline_cell_content

### Description

@short: 允许在 timeline 单元格内指定自定义 HTML 内容

@signature: timeline_cell_content: (task: Task, date: Date) =\> string | number | void;

### Parameters

- `task` - (required) *Task* - 任务对象
- `date` - (required) *Date* - 对应单元格的日期

### Returns
- ` text` - (string | number | void) - 一个 HTML 字符串

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
 当你想在 timeline 单元格内显示自定义内容时，推荐使用此模板，而不是 [addTaskLayer()](guides/baselines.md) 方法。该模板实现更简单且性能更优。 
:::

请注意，自定义内容会显示在任务条的*下方*，因此任务条的 z-index 更高。这意味着如果任务条覆盖了单元格，自定义内容可能会被隐藏。

如果你希望自定义内容显示在任务条之上，可以为自定义元素设置更高的 'z-index':

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
- [时间线区域的模板](guides/timeline-templates.md)
- [时间线区域中的自定义元素](guides/baselines.md)

### Change log
- 版本 v8.0 新增

