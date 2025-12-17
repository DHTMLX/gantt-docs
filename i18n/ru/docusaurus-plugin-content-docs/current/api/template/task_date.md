---
sidebar_label: task_date
title: task_date template
description: "определяет формат даты, используемый для метки в разделе «Time period» в лайтбоксе"
---

# task_date

### Description

@short: Определяет формат даты, используемый для метки в разделе «Time period» в лайтбоксе

@signature: task_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - значение даты, которое будет отформатировано

### Returns
- ` text` - (string) - html контент, который будет отображён в gantt

### Example

~~~jsx
gantt.templates.task_date= function(date){
    return gantt.date.date_to_str(gantt.config.task_date)(date);
};
~~~

### Related API
- [task_date](api/config/task_date.md)

### Related Guides
- [Шаблоны Lightbox](guides/lightbox-templates.md)

