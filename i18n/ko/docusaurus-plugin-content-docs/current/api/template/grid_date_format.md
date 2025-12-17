---
sidebar_label: grid_date_format
title: grid_date_format template
description: "날짜 값을 표시하는 열에서 날짜가 어떻게 표시되는지 정의합니다 (반환값은 `Date` 값입니다)"
---

# grid_date_format

### Description

@short: 날짜 값을 표시하는 열에서 날짜가 어떻게 표시되는지 정의합니다 (반환값은 `Date` 값입니다)

@signature: grid_date_format: (date: Date, column?: string) =\> string;

### Parameters

- `date` - (required) *Date* - 포맷팅이 필요한 날짜
- `column` - (optional) *string* - 템플릿을 호출한 열의 이름

### Returns
- ` text` - (string) - gantt에 표시될 html 텍스트

### Example

~~~jsx
gantt.templates.grid_date_format = function(date, column){
    return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

### Details

이 템플릿 함수는 일정이 잡히지 않은 작업을 제외한 모든 작업에 대해 호출됩니다.

:::note
 **grid_date_format** 템플릿은 [date_grid](api/template/date_grid.md) 템플릿에서만 사용되므로, 여기서 변경한 내용은 **grid_date_format**에도 영향을 미칩니다. 
:::

### Related API
- [task_end_date](api/template/task_end_date.md)

### Related Guides
- [그리드의 템플릿](guides/table-templates.md)

