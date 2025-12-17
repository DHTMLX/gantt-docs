---
sidebar_label: task_date
title: task_date template
description: "라이트박스의 'Time period' 섹션에서 레이블에 사용되는 날짜 형식을 정의합니다."
---

# task_date

### Description

@short: 라이트박스의 'Time period' 섹션에서 레이블에 사용되는 날짜 형식을 정의합니다.

@signature: task_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 형식화될 날짜 값입니다.

### Returns
- ` text` - (string) - gantt에 표시될 html 내용입니다.

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

