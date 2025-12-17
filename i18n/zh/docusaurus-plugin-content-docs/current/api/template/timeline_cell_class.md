---
sidebar_label: timeline_cell_class
title: timeline_cell_class template
description: "定义应用于 timeline 区域单元格的 CSS 类"
---

# timeline_cell_class

### Description

@short: 定义应用于 timeline 区域单元格的 CSS 类

@signature: timeline_cell_class: (item: any, date: Date) =\> string | void;

### Parameters

- `item` - (required) *Task | object* -        与行关联的任务或资源对象
- `date` - (required) *Date* - 单元格对应的具体日期

### Returns
- ` text` - (string | void) - 给定 item 对应的 CSS 类名

### Example

~~~jsx
<style>
.weekend{ background: #f4f7f4 !important;}
</style>

gantt.templates.timeline_cell_class = function(task,date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend";
    }
};
~~~

### Related samples
- [Highlighting weekends](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)

### Details

在处理[工作时间计算](guides/working-time.md)时，推荐使用 [isWorkTime](api/method/isworktime.md) 而非固定值:

~~~js
gantt.config.work_time = true;

gantt.templates.timeline_cell_class = function(task,date){
    if(!gantt.isWorkTime({task:task, date:date}))
        return "weekend";
};
~~~

### Related API
- [scale_cell_class](api/template/scale_cell_class.md)
- [task_row_class](api/template/task_row_class.md)
- [task_class](api/template/task_class.md)
- [timeline_placeholder](api/config/timeline_placeholder.md)

### Related Guides
- [时间线区域的模板](guides/timeline-templates.md)
- [高亮显示时间段](guides/highlighting-time-slots.md)
- [工作时间计算](guides/working-time.md)

