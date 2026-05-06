---
sidebar_label: dynamic_resource_calendars
title: dynamic_resource_calendars 구성
description: "여러 리소스 달력들을 하나로 자동으로 병합하도록 활성화합니다"
---

# dynamic_resource_calendars

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

### Description

@short: 여러 리소스 달력들을 하나로 자동으로 병합합니다

@signature: dynamic_resource_calendars: boolean

### Example

~~~jsx
gantt.config.dynamic_resource_calendars = true;
~~~

### Related samples
- [다양한 리소스의 작업 달력 병합](https://docs.dhtmlx.com/gantt/samples/09_worktime/10_merge_calendars.html)

### Related API
- [resource_calendars](api/config/resource_calendars.md)
- [addCalendar](api/method/addcalendar.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md#mergingcalendars)

### Change log
- v7.0에서 추가됨