---
sidebar_label: inherit_calendar
title: inherit_calendar config
description: "작업이 상위 요약 작업의 작업 캘린더를 상속할지 여부를 정의합니다."
---

# inherit_calendar
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 작업이 상위 요약 작업의 작업 캘린더를 상속할지 여부를 정의합니다.

@signature: inherit_calendar: boolean

### Example

~~~jsx
gantt.config.inherit_calendar = true;
~~~

**Default value:** false

### Related samples
- [Project level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/08_project_calendars.html)

### Details


기본적으로, 작업에 지정된 작업 캘린더가 없으면 전역 작업 캘린더를 사용합니다.

이 옵션을 `true`로 설정하면 해당 작업들은 상위 요약(프로젝트) 작업의 캘린더를 상속받게 됩니다.

### Related Guides
- [작업 시간 계산](guides/working-time.md)
