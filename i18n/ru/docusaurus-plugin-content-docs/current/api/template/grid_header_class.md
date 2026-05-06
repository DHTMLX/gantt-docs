---
sidebar_label: grid_header_class
title: grid_header_class шаблон
description: "задает CSS класс, который будет применяться к заголовкам столбцов таблицы"
---

# grid_header_class

### Description

@short: Задает CSS класс, который будет применяться к заголовкам столбцов таблицы

@signature: grid_header_class: (columnName: string, column: any) =\> string | void;

### Parameters

- `columnName` - (required) *string* - имя столбца (как указано в свойстве "name" объекта столбца)
- `column` - (required) *object* - объект столбца (как указано в конфигурации <i>gantt.config.columns</i>)

### Returns
- ` text` - (string | void) - CSS класс для соответствующего элемента

### Example

~~~jsx
gantt.templates.grid_header_class = function(columnName, column){
    return "";
};
~~~

### Related Guides
- [Шаблоны Grid](guides/table-templates.md)