---
sidebar_label: grid_header_class
title: grid_header_class template
description: "specifies the CSS class that will be applied to the headers of the table's columns"
---

# grid_header_class

### Description

@short: Specifies the CSS class that will be applied to the headers of the table's columns

@signature: grid_header_class: (columnName: string, column: any) =\> string | void;

### Parameters

- `columnName` - (required) *string* - the column's name (as specified in the "name" property of the column object)
- `column` - (required) *object* - column object (as specified in the <i>gantt.config.columns</i> config)

### Returns
- ` text` - (string | void) - a CSS class for the item in question

### Example

~~~jsx
gantt.templates.grid_header_class = function(columnName, column){
    return "";
};
~~~

### Related Guides
- [Templates of the Grid](guides/table-templates.md)
