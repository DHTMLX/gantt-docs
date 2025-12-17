---
sidebar_label: task_end_date
title: task_end_date template
description: "управляет тем, как отображаются даты окончания задач в lightbox"
---

# task_end_date

### Description

@short: Управляет тем, как отображаются даты окончания задач в lightbox

@signature: task_end_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - дата, которую нужно отформатировать

### Returns
- ` text` - (string) - HTML текст, который будет отображаться в gantt

### Example

~~~jsx
gantt.templates.task_end_date = function(date){
   return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};
~~~

### Details

## Настройка формата включающих даты окончания

Вы можете переопределить этот шаблон, чтобы изменить отображение дат окончания задач в gantt, например, чтобы включить дату окончания в продолжительность задачи.

Например, рассмотрим задачу, начинающуюся 2 апреля 2020 года и длящуюся один день.

По умолчанию её дата окончания будет отображаться как 3 апреля 2020 года (`03-04-2020 00:00:00`):

- [Live demo: Default format](https://snippet.dhtmlx.com/5/24f73d6ec)

![task_end_date_template_default](/img/task_end_date_template_default.png)

Можно изменить отображение даты окончания на 2 апреля 2020 года:

- [Live demo: Inclusive end date format](https://snippet.dhtmlx.com/t1k1rwo7)

![task_end_date_template](/img/task_end_date_template.png)

Для этого переопределите конфигурацию **columns** следующим образом:

~~~js

gantt.config.columns = [
  {name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode},
  {name: "text", label: "Name", tree: true, width: 200, resize: true},
  {name: "start_date", label: "Start", width:80, align: "center", resize: true},
  {name: "end_date", label: "Finish", width:80, align: "center", resize: true},    
  {name:"add"}
];
gantt.templates.task_end_date = function(date){
   return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};

var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
   if(column === "end_date"){
     return gridDateToStr(new Date(date.valueOf() - 1)); 
   }else{
     return gridDateToStr(date); 
   }
}
gantt.init("gantt_here");

~~~

Для дополнительной информации о форматировании дат окончания смотрите статью [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates).

### Related API
- [task_date](api/config/task_date.md)
- [task_date](api/template/task_date.md)
- [grid_date_format](api/template/grid_date_format.md)

### Related Guides
- [Шаблоны Lightbox](guides/lightbox-templates.md)
- [Загрузка данных](guides/loading.md#taskenddatedisplayampinclusiveenddates)

