---
sidebar_label: getResourceCalendar
title: getResourceCalendar 메서드
description: "리소스가 할당된 캘린더를 반환합니다"
---

# getResourceCalendar

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 리소스가 할당된 캘린더를 반환합니다

@signature: getResourceCalendar: (resource: string | number | object) => any

### Parameters

- `resource` - (필수) *string | number | object* -        리소스의 ID 또는 객체

### Returns
- ` param` - (object) - 캘린더 객체

### Example

~~~jsx
var calendar = gantt.getResourceCalendar(mikeCalendarId);
~~~


### Related API
- [resource_calendars](api/config/resource_calendars.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md#assigningcalendartoresource)

### Change log
- v7.0에서 추가됨