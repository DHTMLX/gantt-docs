---
sidebar_label: task_date
title: task_date template
description: "라이트박스의 'Time period' 섹션에 표시될 레이블의 날짜 형식을 지정합니다"
---

# task_date

### Description

@short: 라이트박스의 'Time period' 섹션에 표시될 레이블의 날짜 형식을 지정합니다

@signature: task_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷이 필요한 날짜

### Returns
- ` text` - (string) - Gantt 차트에 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.task_date= function(date){
    return gantt.date.date_to_str(gantt.config.task_date)(date);
};
~~~

### Related API
- [task_date](api/config/task_date.md)

### Related Guides
- [라이트박스의 템플릿](guides/lightbox-templates.md)

