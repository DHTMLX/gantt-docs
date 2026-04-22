---
sidebar_label: grid_date_format
title: grid_date_format 템플릿
description: "날짜를 표시하는 열의 날짜 형식을 지정합니다( `Date` 값을 반환합니다)"
---

# grid_date_format

### Description

@short: 날짜를 표시하는 열의 날짜 형식을 지정합니다( `Date` 값을 반환합니다)

@signature: grid_date_format: (date: Date, column?: string) => string;

### Parameters

- `date` - (required) *Date* - 형식이 필요한 날짜
- `column` - (선택적) *string* - 템플릿을 호출한 열의 이름

### Returns
- `text` - (string) - 간트 차트에 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.grid_date_format = function(date, column){
    return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

### Details

템플릿 함수는 모든 작업에 대해 호출되며, 일정되지 않은 작업은 제외됩니다.

:::note
**grid_date_format** 템플릿은 오직 [date_grid](api/template/date_grid.md) 템플릿에서만 사용되므로, 변경하면 **grid_date_format** 도 영향을 받습니다.
:::

### Related API
- [task_end_date](api/template/task_end_date.md)

### Related Guides
- [그리드의 템플릿](guides/table-templates.md)

