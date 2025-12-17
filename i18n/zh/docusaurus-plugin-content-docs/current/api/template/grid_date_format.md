---
sidebar_label: grid_date_format
title: grid_date_format template
description: "定义在显示日期值的列中日期的显示方式（返回`Date`值）"
---

# grid_date_format

### Description

@short: 定义在显示日期值的列中日期的显示方式（返回`Date`值）

@signature: grid_date_format: (date: Date, column?: string) =\> string;

### Parameters

- `date` - (required) *Date* - 需要格式化的日期
- `column` - (optional) *string* - 触发模板的列名

### Returns
- ` text` - (string) - 将在甘特图中显示的html文本

### Example

~~~jsx
gantt.templates.grid_date_format = function(date, column){
    return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

### Details

此模板函数会被调用于所有任务，除了那些未排程的任务。

:::note
 **grid_date_format** 模板仅被 [date_grid](api/template/date_grid.md) 模板使用，因此此处的任何修改也会影响 **grid_date_format**。 
:::

### Related API
- [task_end_date](api/template/task_end_date.md)

### Related Guides
- [网格的模板](guides/table-templates.md)

