---
sidebar_label: getTaskPosition
title: getTaskPosition method
description: "计算任务的DOM元素在时间线区域内的位置和大小。"
---

# getTaskPosition

### Description

@short: 计算任务的DOM元素在时间线区域内的位置和大小。

@signature: getTaskPosition: (task: Task, from?: Date, to?: Date) =\> any

### Parameters

- `task` - (required) *Task* - 任务对象
- `from` - (optional) *Date* - 可选，项目的开始日期
- `to` - (optional) *Date* - 可选，项目的结束日期

### Returns
- ` object` - (object) - 一个描述大小和位置的对象

### Example

~~~jsx
// 添加基线显示
gantt.addTaskLayer(function draw_planned(task) {
    if (task.planned_start && task.planned_end) {
        const sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end); /*!*/
        const el = document.createElement('div');
        el.className = 'baseline';
        el.style.left = sizes.left + 'px';
        el.style.top = sizes.top + 'px';
        el.style.width = sizes.width + 'px';
        el.style.height= sizes.height + 'px';
        return el;
    }
    return false;
});
~~~

### Related samples
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

此方法返回一个包含以下属性的对象:

- **left** - CSS中左侧位置，单位为像素
- **top** - CSS中顶部位置，单位为像素
- **height** - 条形元素的CSS高度，单位为像素（由[bar_height](api/config/bar_height.md)配置或*task.bar_height*属性设置）
- **rowHeight** - 任务行的CSS高度，单位为像素（由[row_height](api/config/row_height.md)配置或*task.row_height*属性设置）（v7.1新增）
- **width** - CSS宽度，单位为像素（基于任务的开始和结束日期之间的时间段，或者如果提供了可选的'from'和'to'日期，则基于这两个日期）

如果只提供一个参数，方法将使用**task.start_date**和**task.end_date**来计算**width**和**left**。如果提供了第二和第三个参数，则使用这些日期。

请注意，该方法始终考虑日期的日期和时间部分，无论时间刻度设置如何。例如，以下两个调用:

~~~js
gantt.getTaskPosition(task, new Date(2019, 3, 19, 1, 0), new Date(2019, 3, 19, 1, 0)); 
// 和
gantt.getTaskPosition(task, new Date(2019, 3, 19, 1, 0), new Date(2019, 3, 19, 5, 0)); 
~~~

无论您使用的是*hour*、*day*、*month*还是*year*刻度，都会返回不同大小的框。

