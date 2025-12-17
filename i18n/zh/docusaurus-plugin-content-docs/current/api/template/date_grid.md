---
sidebar_label: date_grid
title: date_grid template
description: "定义在显示日期（返回 `Date` 值）的列中展示的内容，这些列位于 grid 中"
---

# date_grid

### Description

@short: 定义在显示日期（返回 `Date` 值）的列中展示的内容，这些列位于 grid 中

@signature: date_grid: (date: Date, task: Task, column: string) =\> string;

### Parameters

- `date` - (required) *Date* - 要格式化的日期值
- `task` - (required) *Task* - 与日期相关联的任务对象
- `column` - (required) *string* - 调用模板的列名

### Returns
- ` text` - (string) - 将在 gantt 中显示的 html 文本

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
- [Gantt. 设置 grid 中显示日期的列的格式](https://snippet.dhtmlx.com/87j43fc3)

### Related API
- [date_grid](api/config/date_grid.md)
- [grid_date_format](api/template/grid_date_format.md)

### Related Guides
- [网格的模板](guides/table-templates.md)

