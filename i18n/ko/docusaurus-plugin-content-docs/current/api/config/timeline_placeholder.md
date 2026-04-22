---
sidebar_label: timeline_placeholder
title: timeline_placeholder 구성
description: "빈 타임라인에서 배경 격자를 표시합니다"
---

# timeline_placeholder

### Description

@short: 빈 타임라인에서 배경 격자를 표시합니다

@signature: timeline_placeholder: boolean

### Example

~~~jsx
gantt.config.timeline_placeholder = false;
...
gantt.init("gantt_here");
~~~

### Related samples
- [Empty Gantt with placeholder grid and timeline](https://docs.dhtmlx.com/gantt/samples/08_api/23_empty_gantt_with_placeholder_views.html)

### Details

빈 타임라인에서 배경 격자가 표시될 수 있습니다. Gantt에 로드된 작업이 없으면 타임라인에 배경 격자가 표시됩니다:

![배경 격자](/img/background_grid_in_empty_timeline.png)

또는 작업이 있는 행이 타임라인 전체를 채우지 않는 경우에도 표시됩니다:

![배경 격자](/img/background_grid_in_timeline.png)

배경 격자에서 열과 셀을 강조하려면 [`timeline_cell_class`](api/template/timeline_cell_class.md) 템플릿을 사용합니다:

~~~js
gantt.templates.timeline_cell_class = function (task, date) (
    if (!gantt.isWorkTime(( date: date, task: task ))) (
        return "weekend";
    )
);
~~~

배경 행의 경우 템플릿에 임시 작업 객체가 추가됩니다. 이 객체는 id로 식별할 수 있습니다:

~~~js
if(task.id === "timeline_placeholder_task")(
    ...
)
~~~

### Related API
- [`timeline_cell_class`](api/template/timeline_cell_class.md)

### Change log
- v8.0에 추가되었습니다