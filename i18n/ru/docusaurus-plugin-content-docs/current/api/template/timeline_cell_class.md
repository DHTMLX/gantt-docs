---
sidebar_label: timeline_cell_class
title: timeline_cell_class template
description: "определяет CSS класс, который применяется к ячейкам внутри области timeline"
---

# timeline_cell_class

### Description

@short: Определяет CSS класс, который применяется к ячейкам внутри области timeline

@signature: timeline_cell_class: (item: any, date: Date) =\> string | void;

### Parameters

- `item` - (required) *Task | object* -        задача или объект ресурса, связанный со строкой
- `date` - (required) *Date* - конкретная дата ячейки

### Returns
- ` text` - (string | void) - имя CSS класса для данного элемента

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

При работе с [расчетами рабочего времени](guides/working-time.md) лучше использовать [isWorkTime](api/method/isworktime.md) вместо фиксированных значений:

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
- [Шаблоны области временной шкалы](guides/timeline-templates.md)
- [Выделение временных слотов](guides/highlighting-time-slots.md)
- [Расчёт рабочего времени](guides/working-time.md)

