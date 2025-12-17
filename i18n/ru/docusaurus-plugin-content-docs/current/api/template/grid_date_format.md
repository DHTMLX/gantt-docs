---
sidebar_label: grid_date_format
title: grid_date_format template
description: "определяет, как отображаются даты в колонках, которые показывают значения даты (возвращает значения типа `Date`)"
---

# grid_date_format

### Description

@short: Определяет, как отображаются даты в колонках, которые показывают значения даты (возвращает значения типа `Date`)

@signature: grid_date_format: (date: Date, column?: string) =\> string;

### Parameters

- `date` - (required) *Date* - дата, которую нужно отформатировать
- `column` - (required) *string* - имя колонки, которая вызвала шаблон

### Returns
- ` text` - (string) - html-текст, который будет отображён в gantt

### Example

~~~jsx
gantt.templates.grid_date_format = function(date, column){
    return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

### Details

Эта функция шаблона вызывается для всех задач, кроме тех, которые не запланированы. 

:::note
note Шаблон **grid_date_format** используется только в шаблоне [date_grid](api/template/date_grid.md), поэтому любые изменения здесь повлияют и на **grid_date_format**. 
:::

### Related API
- [task_end_date](api/template/task_end_date.md)

### Related Guides
- [Шаблоны грида](guides/table-templates.md)

