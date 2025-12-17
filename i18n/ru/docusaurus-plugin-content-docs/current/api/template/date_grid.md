---
sidebar_label: date_grid
title: date_grid template
description: "определяет содержимое, отображаемое в колонках, показывающих даты (возвращающих значения `Date`) внутри grid"
---

# date_grid

### Description

@short: Определяет содержимое, отображаемое в колонках, показывающих даты (возвращающих значения `Date`) внутри grid

@signature: date_grid: (date: Date, task: Task, column: string) =\> string;

### Parameters

- `date` - (required) *Date* - значение даты, которое нужно отформатировать
- `task` - (required) *Task* - объект задачи, связанный с датой
- `column` - (required) *string* - название колонки, вызывающей шаблон

### Returns
- ` text` - (string) - html-текст, который будет отображён в gantt

### Example

~~~jsx
gantt.templates.date_grid = function(date, task, column){
   if(task && gantt.isUnscheduledTask(task) && gantt.config.show_unscheduled){
        return gantt.templates.task_unscheduled_time(task);
       }else{
        return gantt.templates.grid_date_format(date);
   }
}
~~~

### Related samples
- [Gantt. Настройка формата колонок с датами в grid](https://snippet.dhtmlx.com/87j43fc3)       

### Related API
- [date_grid](api/config/date_grid.md)
- [grid_date_format](api/template/grid_date_format.md)

### Related Guides
- [Шаблоны грида](guides/table-templates.md)

