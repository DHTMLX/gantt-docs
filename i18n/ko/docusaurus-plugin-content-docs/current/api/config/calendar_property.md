---
sidebar_label: calendar_property
title: calendar_property 구성
description: "캘린더를 작업/작업 그룹에 바인딩하는 데 영향을 주는 속성의 이름을 변경합니다"
---

# calendar_property

### Description

@short: 캘린더를 작업/작업 그룹에 바인딩하는 데 영향을 주는 속성의 이름을 변경합니다

@signature: calendar_property: string

### Example

~~~jsx
gantt.config.calendar_property = "property_name";
~~~

### Details

버전 4.2에서 추가됨

옵션의 기본 값은 "calendar_id"입니다.

~~~js
{
    "id":2, 
    "calendar_id":"custom", 
    "text":"Task #1", 
    "start_date":"02-04-2013", 
    "duration":"8", 
    "parent":"1", 
    "progress":0.5, 
    "open": true
}
~~~

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [isWorkTime](api/method/isworktime.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)