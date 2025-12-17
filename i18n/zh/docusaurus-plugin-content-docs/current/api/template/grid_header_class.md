---
sidebar_label: grid_header_class
title: grid_header_class template
description: "定义将分配给表格列标题的CSS类"
---

# grid_header_class

### Description

@short: 定义将分配给表格列标题的CSS类

@signature: grid_header_class: (columnName: string, column: any) =\> string | void;

### Parameters

- `columnName` - (required) *string* - 列的名称（对应列对象中的 "name" 属性）
- `column` - (required) *object* - 列对象本身（来自 <i>gantt.config.columns</i> 配置）

### Returns
- ` text` - (string | void) - 要应用于指定标题的CSS类

### Example

~~~jsx
gantt.templates.grid_header_class = function(columnName, column){
    return "";
};
~~~

### Related Guides
- [网格的模板](guides/table-templates.md)
