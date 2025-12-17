---
sidebar_label: task_date
title: task_date config
description: "라이트박스의 'Time period' 섹션에 표시되는 날짜 레이블의 형식을 정의합니다."
---

# task_date

### Description

@short: 라이트박스의 'Time period' 섹션에 표시되는 날짜 레이블의 형식을 정의합니다.

@signature: task_date: string

### Example

~~~jsx
gantt.config.task_date = "%d-%m-%Y";
gantt.init("gantt_here");
~~~

**Default value:** "%d %F %Y"

### Related API
- [task_date](api/template/task_date.md)

### Related Guides
- [날짜 형식 지정](guides/date-format.md)

