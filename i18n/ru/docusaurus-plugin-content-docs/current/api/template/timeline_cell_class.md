---
sidebar_label: timeline_cell_class
title: timeline_cell_class template
description: "указывается CSS-класс, который будет применяться к ячейкам области временной шкалы"
---

# timeline_cell_class

### Description

@short: Указывает CSS-класс, который будет применяться к ячейкам области временной шкалы

@signature: timeline_cell_class: (item: any, date: Date) =\> string | void;

### Parameters

- `item` - (required) *Task | object* - либо объект задачи или ресурса, привязанный к строке
- `date` - (required) *Date* - дата ячейки

### Returns
- ` text` - (string | void) - CSS-класс для соответствующего элемента

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
- [Выделение выходных](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)

### Details

Note that while using [work time calculations](guides/working-time.md), you can use [isWorkTime](api/method/isworktime.md) instead of hardcoded values:

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
- [Шаблоны области Timeline](guides/timeline-templates.md)
- [Выделение временных интервалов](guides/highlighting-time-slots.md)
- [Расчет рабочего времени](guides/working-time.md)