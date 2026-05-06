---
sidebar_label: task_date
title: task_date шаблон
description: "задаёт формат даты метки в разделе 'Time period' lightbox"
---

# task_date

### Description

@short: Указывает формат даты метки в разделе 'Time period' lightbox

@signature: task_date: (date: Date) => string;

### Parameters

- `date` - (required) *Date* - дата, которая подлежит форматированию

### Returns
- `text` - (string) - HTML-текст, который будет отрисован в gantt

### Example

~~~jsx
gantt.templates.task_date= function(date){
    return gantt.date.date_to_str(gantt.config.task_date)(date);
};
~~~

### Related API
- [task_date](api/config/task_date.md)

### Related Guides
- [Шаблоны lightbox](guides/lightbox-templates.md)