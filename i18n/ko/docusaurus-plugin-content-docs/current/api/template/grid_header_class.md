---
sidebar_label: grid_header_class
title: grid_header_class template
description: "테이블 열 헤더에 할당될 CSS 클래스를 정의합니다."
---

# grid_header_class

### Description

@short: 테이블 열 헤더에 할당될 CSS 클래스를 정의합니다.

@signature: grid_header_class: (columnName: string, column: any) =\> string | void;

### Parameters

- `columnName` - (required) *string* - 열의 이름 (column 객체의 "name" 속성과 일치)
- `column` - (required) *object* - 열 객체 자체 (<i>gantt.config.columns</i> 설정에서 가져옴)

### Returns
- ` text` - (string | void) - 지정된 헤더에 적용할 CSS 클래스

### Example

~~~jsx
gantt.templates.grid_header_class = function(columnName, column){
    return "";
};
~~~

### Related Guides
- [그리드의 템플릿](guides/table-templates.md)
