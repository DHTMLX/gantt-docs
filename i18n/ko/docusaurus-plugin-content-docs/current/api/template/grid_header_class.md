---
sidebar_label: grid_header_class
title: grid_header_class 템플릿
description: "표의 열 헤더에 적용될 CSS 클래스를 지정합니다"
---

# grid_header_class

### Description

@short: 표의 열 헤더에 적용될 CSS 클래스를 지정합니다

@signature: grid_header_class: (columnName: string, column: any) => string | void;

### Parameters

- `columnName` - (필수) *string* - 열의 이름(열 객체의 'name' 속성에 따라 지정됩니다)
- `column` - (필수) *object* - 열 객체(구성 <i>gantt.config.columns</i>에서 지정된 대로)

### Returns
- ` text` - (string | void) - 해당 항목에 대한 CSS 클래스

### Example

~~~jsx
gantt.templates.grid_header_class = function(columnName, column){
    return "";
};
~~~

### Related Guides
- [그리드의 템플릿](guides/table-templates.md)