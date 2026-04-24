---
sidebar_label: date_grid
title: date_grid шаблон
description: "задает содержимое колонок, которые отображают даты (возвращаются значения `Date`) в grid"
---

# date_grid

### Description

@short: Задает содержимое колонок, которые отображают даты (возвращаются значения `Date`) в grid

@signature: date_grid: (date: Date, task: Task, column: string) => string;

### Parameters

- `date` - (required) *Date* - дата, которую нужно отформатировать
- `task` - (required) *Task* - объект задачи
- `column` - (required) *string* - имя столбца, который вызвал шаблон

### Returns
- `text` - (string) - HTML-текст, который будет отрисован в диаграмме Ганта

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
- [Gantt. Setting the format of columns with dates in grid](https://snippet.dhtmlx.com/87j43fc3)

### Related API
- [date_grid](api/config/date_grid.md)
- [grid_date_format](api/template/grid_date_format.md)

### Related Guides
- [Templates of the Grid](guides/table-templates.md)