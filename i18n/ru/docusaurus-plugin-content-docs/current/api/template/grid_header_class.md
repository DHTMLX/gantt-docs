---
sidebar_label: grid_header_class
title: grid_header_class template
description: "определяет CSS класс, который будет назначен заголовкам колонок таблицы"
---

# grid_header_class

### Description

@short: Определяет CSS класс, который будет назначен заголовкам колонок таблицы

@signature: grid_header_class: (columnName: string, column: any) =\> string | void;

### Parameters

- `columnName` - (required) *string* - имя колонки (соответствует свойству "name" в объекте колонки)
- `column` - (required) *object* - сам объект колонки (из конфигурации <i>gantt.config.columns</i>)

### Returns
- ` text` - (string | void) - CSS класс, который будет применён к указанному заголовку

### Example

~~~jsx
gantt.templates.grid_header_class = function(columnName, column){
    return "";
};
~~~

### Related Guides
- [Шаблоны грида](guides/table-templates.md)
