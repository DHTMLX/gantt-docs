---
sidebar_label: inherit_calendar
title: inherit_calendar 구성
description: "작업이 요약 부모로부터 근무 캘린더를 상속할지 여부를 정의합니다"
---

# inherit_calendar

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

### Description

@short: 작업이 요약 상위 부모로부터 근무 캘린더를 상속받을지 여부를 정의합니다

@signature: inherit_calendar: boolean

### Example

~~~jsx
gantt.config.inherit_calendar = true;
~~~

**Default value:** false

### Related samples
- [프로젝트 수준 캘린더](https://docs.dhtmlx.com/gantt/samples/09_worktime/08_project_calendars.html)

### Details

:::note
pronote 이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

By default, tasks that don't have work calendar specified will use the global work calendar.

After setting this config to `true`, such tasks will use a calendar of their summary (project) parent task.

### Related Guides
- [근무 시간 계산](guides/working-time.md)