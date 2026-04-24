---
sidebar_label: grid_date_format
title: шаблон grid_date_format
description: "задает формат дат для столбцов, которые отображают даты (возвращают значения `Date`)"
---

# grid_date_format

### Description

@short: Задает формат дат для столбцов, которые показывают даты (возвращают значения `Date`)

@signature: grid_date_format: (date: Date, column?: string) =\> string;

### Parameters

- `date` - (required) *Date* - дата, которая требует форматирования
- `column` - (optional) *string* - имя столбца, который вызвал шаблон

### Returns
- `text` - (string) - HTML-текст, который будет отрисован в диаграмме Ганта

### Example

~~~jsx
gantt.templates.grid_date_format = function(date, column){
    return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

### Details

Функция шаблона вызывается для всех задач, кроме незапланированных.

:::note
Шаблон **grid_date_format** используется только внутри шаблона [date_grid](api/template/date_grid.md), поэтому если вы внесете изменения в него, на **grid_date_format** повлияют изменения.
:::

### Related API
- [task_end_date](api/template/task_end_date.md)

### Related Guides
- [Шаблоны сетки](guides/table-templates.md)