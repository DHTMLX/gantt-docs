---
sidebar_label: date_grid
title: date_grid template
description: "definiert den Inhalt, der in Spalten angezeigt wird, welche Daten (Rückgabe von `Date`-Werten) innerhalb des Grids darstellen"
---

# date_grid

### Description

@short: Definiert den Inhalt, der in Spalten angezeigt wird, welche Daten (Rückgabe von `Date`-Werten) innerhalb des Grids darstellen

@signature: date_grid: (date: Date, task: Task, column: string) =\> string;

### Parameters

- `date` - (required) *Date* - der zu formatierende Datumswert
- `task` - (required) *Task* - das mit dem Datum verknüpfte Task-Objekt
- `column` - (required) *string* - der Name der Spalte, die die Vorlage aufruft

### Returns
- ` text` - (string) - html Text, der im Gantt angezeigt wird

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
- [Gantt. Einstellung des Formats von Spalten mit Daten im Grid](https://snippet.dhtmlx.com/87j43fc3)        

### Related API
- [date_grid](api/config/date_grid.md)
- [grid_date_format](api/template/grid_date_format.md)

### Related Guides
- ["Vorlagen des Grids"](guides/table-templates.md)

