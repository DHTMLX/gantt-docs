---
sidebar_label: calendar_property
title: calendar_property config
description: "작업 또는 작업 그룹에 캘린더를 연결하는 데 사용되는 속성 이름을 설정합니다."
---

# calendar_property

### Description

@short: 작업 또는 작업 그룹에 캘린더를 연결하는 데 사용되는 속성 이름을 설정합니다.

@signature: calendar_property: string

### Example

~~~jsx
gantt.config.calendar_property = "property_name";
~~~

### Details

버전 4.2에서 도입되었습니다.

기본적으로 이 옵션은 "calendar_id"로 설정되어 있습니다.

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
- [작업 시간 계산](guides/working-time.md#unsettingtheworkingtime)

