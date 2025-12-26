---
title: "수동으로 예약된 요약 작업"
sidebar_label: "수동으로 예약된 요약 작업"
---

# 수동으로 예약된 요약 작업

[Gantt 차트](guides/task-types.md)에서 더 많은 제어와 정밀성을 제공하기 위해 프로젝트(요약 작업)를 수동으로 예약할 수 있습니다.

일반적으로 요약 작업은 하위 작업 중 가장 이른 시작일과 가장 늦은 종료일을 자동으로 가져와서 날짜를 설정합니다. 하지만, 고정된 시작일과 종료일을 요약 작업에 직접 지정하여 하위 작업과 무관하게 날짜를 설정할 수 있습니다. 이렇게 하면 Gantt 차트에는 고정된 기간과 하위 작업에서 계산된 기간이 모두 표시됩니다.


[Manually Scheduled Projects](https://docs.dhtmlx.com/gantt/samples/04_customization/25_project_dates.html)


요약 작업에 대해 수동 예약을 활성화하려면 [auto_scheduling](api/config/auto_scheduling.md) 속성을 *false*로 설정하세요.

고정된 날짜는 **task.start_date** 및 **task.end_date**에 저장되며, 하위 작업에서 계산된 날짜는 **task.$auto_start_date** 및 **task.$auto_end_date**에서 확인할 수 있습니다.

~~~js
gantt.parse({
  data: [
    {
      id: 1,
      text: "Project Phase 1",
      type: "project",
      start_date: "2025-05-01 00:00:00",
      duration: 15,
      auto_scheduling: false /* ! */
    },
    // ...
  ],
});
~~~

수동으로 지정된 요약 작업의 기간과 하위 작업을 기반으로 한 실제 기간이 Gantt 차트에 모두 표시됩니다.

만약 하위 작업의 날짜가 요약 작업에 지정된 날짜 범위를 벗어날 경우, 요약 작업이 강조 표시되어 예약 충돌이 있음을 알립니다. 이 시각적 표시를 통해 사용자는 일정의 불일치를 빠르게 확인하고 해결할 수 있습니다.

![범위를 벗어난 요약 작업 강조 표시](/img/custom_project_dates.png)

