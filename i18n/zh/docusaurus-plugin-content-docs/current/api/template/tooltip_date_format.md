---
sidebar_label: tooltip_date_format
title: tooltip_date_format template
description: "定义开始和结束日期在tooltip中的显示格式"
---

# tooltip_date_format

### Description

@short: 定义开始和结束日期在tooltip中的显示格式

@signature: tooltip_date_format: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 显示在gantt tooltip中的html文本

### Example

~~~jsx
gantt.templates.tooltip_date_format=function (date){
    var formatFunc = gantt.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
};
~~~

### Details

:::note
 该模板是**tooltip**扩展的一部分，请确保启用[tooltip](guides/extensions-list.md)插件。更多信息请参见[Gantt 元素的工具提示](guides/tooltips.md)文档。 
:::

### Related API
- [tooltip_text](api/template/tooltip_text.md)

### Related Guides
- [Tooltips 模板](guides/tooltip-templates.md)
- [Gantt 元素的工具提示](guides/tooltips.md)

