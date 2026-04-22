---
title: "수동으로 스케줄링된 요약 작업"
sidebar_label: "수동으로 스케줄링된 요약 작업"
---

# 수동으로 스케줄링된 요약 작업

요약 작업(프로젝트)을 수동으로 스케줄링할 수 있는 기능이 있습니다. [프로젝트](guides/task-types.md) (요약 작업)을 간트 차트를 사용해 관리할 때 이 기능은 유연성과 정확성을 높여줍니다.

기본적으로 요약 작업은 해당 하위 작업들의 가장 이른 시작일과 가장 늦은 종료일을 기준으로 날짜를 자동으로 계산합니다. 또한 하위 작업과 무관하게 요약 작업의 시작일과 종료일을 고정할 수 있습니다. 그 결과 간트 차트에는 고정된 기간과 하위 작업에서 산출된 기간이 모두 표시됩니다.

[수동으로 스케줄링된 프로젝트](https://docs.dhtmlx.com/gantt/samples/04_customization/25_project_dates.html)

요약 작업에 대해 이 기능을 활성화하려면 [auto_scheduling](api/config/auto_scheduling.md) 속성을 *false*로 설정합니다.

고정 날짜는 **task.start_date** 및 **task.end_date**에 저장되며, 하위 작업들로부터 계산된 날짜는 **task.$auto_start_date** 및 **task.$auto_end_date**에서 사용할 수 있습니다.

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

요약 작업의 고정 기간과 하위 작업에서 계산된 실제 기간은 모두 간트 차트에 표시됩니다.

하위 작업의 날짜 범위가 요약 작업에 할당된 날짜를 벗어나면, 일정 충돌을 나타내기 위해 요약 작업이 강조 표시됩니다. 이 시각적 신호는 최종 사용자가 프로젝트 타임라인의 불일치를 신속하게 식별하고 해결하는 데 도움이 됩니다.

![범위를 벗어난 요약 작업 하이라이트](/img/custom_project_dates.png)