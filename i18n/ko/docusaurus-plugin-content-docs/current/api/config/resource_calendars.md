---
sidebar_label: resource_calendars
title: resource_calendars 구성
description: "특정 리소스(예: 사용자)에 할당될 수 있는 근무 일정 캘린더의 집합을 정의합니다."
---

# resource_calendars
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 특정 리소스(예: 사용자)에게 할당할 수 있는 근무 일정 캘린더의 집합을 정의합니다.

@signature: resource_calendars: \{ [resourceId: string | number]: string | number | \{ [resourceId: string | number]: string | number | undefined \} | undefined \}

### Example

~~~jsx
gantt.config.resource_property = "user"
gantt.config.resource_calendars = {
      1 : gantt.addCalendar({
          worktime: {
             days: [0, 1, 1, 1, 1, 1, 0]
          }
     })
};

// 특정 작업에 캘린더 연결
{"id":3, user:"1", "text":"Task #2", "start_date":"11-04-2013", 
    "duration":"4", "parent":"1", "progress": 0.6, "open": true}
~~~

**Default value:** \{\}

### Details

- **[resourceId: string | number]** - (*string | number | \{[resourceId: string | number]: string | number | undefined \} | undefined\*) - 리소스 캘린더의 매핑


버전 7.0 이전에는 dhtmlxGantt가 **resource_calendars**에 대해 약간 다른 형식을 사용했습니다.

위에 나와있는 사용자에게 작업 캘린더를 할당하는 업데이트된 방법이 더 간단하고 사용하기 편리하지만, 이전의 **resource_calendars** 구성 형식도 여전히 지원됩니다:

~~~js
// 작업 캘린더 정의
var johnCalendarId = gantt.addCalendar({
    worktime: {
        days: [0, 1, 1, 1, 1, 1, 0]
    }
}),

// 캘린더를 사용자에 연결
gantt.config.resource_calendars = {
  "user":{
      1 : johnCalendarId
   }
};
~~~

### Related API
- [addCalendar](api/method/addcalendar.md)
- [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md)
- [getResourceCalendar](api/method/getresourcecalendar.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md#assigningcalendartoresource)