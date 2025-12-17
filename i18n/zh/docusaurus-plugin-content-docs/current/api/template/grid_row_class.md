---
sidebar_label: grid_row_class
title: grid_row_class template
description: "定义分配给 grid 行的 CSS 类"
---

# grid_row_class

### Description

@short: 定义分配给 grid 行的 CSS 类

@signature: grid_row_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - 任务开始的日期
- `end` - (required) *Date* - 任务预计完成的日期
- `task` - (required) *Task* - 任务对象本身

### Returns
- ` text` - (string | void) - 对应项的 CSS 类

### Example

~~~jsx
gantt.templates.grid_row_class = function(start, end, task){
    return "";
};
~~~

### Details

在 grid 和 timeline 区域中，每隔一行都会包含一个额外的 CSS 类，名为 **odd**，可以用来创建交替行颜色效果:

~~~css
.gantt_row.odd, .gantt_task_row.odd{
    background: silver;
}

.gantt_row, .gantt_task_row {
    background: white;
}
~~~

默认情况下，这些样式只应用于偶数行。要对奇数行进行样式设置，必须在 CSS 规则的选择器中添加 **odd** 类。因此，如果你想让所有行都具有相同颜色，通常需要为两种选择器都写规则（带有和不带有 '.odd' 类），因为默认 CSS 规则[具有更高的优先级并会覆盖其他规则](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)。

~~~css
.gantt_row.odd, .gantt_task_row.odd,
.gantt_row, .gantt_task_row {
    background: white;
}
~~~

这种方法同样适用于通过 [grid_row_class](api/template/grid_row_class.md) 和 [task_row_class](api/template/task_row_class.md) 模板分配的自定义 CSS 类:


~~~js
gantt.templates.grid_row_class = function(start, end, task){
    return "wheat_color";
};
~~~

~~~css
.wheat_color,
.wheat_color.odd{
    background:wheat;
}
~~~

你可能会注意到屏幕上偶数行似乎被高亮显示，而不是奇数行。然而，如果你查看[行索引](api/method/gettaskindex.md)，会发现样式实际上应用于奇数索引的行（1、3、5 等）。

### Related Guides
- [网格的模板](guides/table-templates.md)

