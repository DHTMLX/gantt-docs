---
sidebar_label: task_date
title: task_date template
description: "定义用于 lightbox 中'Time period'部分标签的日期格式"
---

# task_date

### Description

@short: 定义用于 lightbox 中"Time period"部分标签的日期格式

@signature: task_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 要格式化的日期值

### Returns
- ` text` - (string) - 将在 gantt 中显示的 html 内容

### Example

~~~jsx
gantt.templates.task_date= function(date){
    return gantt.date.date_to_str(gantt.config.task_date)(date);
};
~~~

### Related API
- [task_date](api/config/task_date.md)

### Related Guides
- [Lightbox 的模板](guides/lightbox-templates.md)

