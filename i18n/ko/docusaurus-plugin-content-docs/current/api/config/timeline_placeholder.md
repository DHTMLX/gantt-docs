---
sidebar_label: timeline_placeholder
title: timeline_placeholder config
description: "타임라인이 비어 있을 때 배경 그리드를 표시합니다"
---

# timeline_placeholder

### Description

@short: 타임라인이 비어 있을 때 배경 그리드를 표시합니다

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

타임라인에 작업이 로드되지 않았을 때 배경 그리드가 표시됩니다:

![background grid](/img/background_grid_in_empty_timeline.png)

작업이 포함된 행이 타임라인 전체를 덮지 않을 경우에도 배경 그리드가 나타납니다:

![background grid](/img/background_grid_in_timeline.png)

배경 그리드의 컬럼과 셀에 강조를 추가하려면 [timeline_cell_class](api/template/timeline_cell_class.md) 템플릿을 사용하세요:

~~~js
gantt.templates.timeline_cell_class = function (task, date) {
    if (!gantt.isWorkTime({ date: date, task: task })) {
        return "weekend";
    }
};
~~~

배경 행의 경우, 템플릿에 임시 작업 객체가 전달됩니다. 이 객체는 id를 통해 식별할 수 있습니다:

~~~js
if(task.id === "timeline_placeholder_task"){
    ...
}
~~~

### Related API
- [timeline_cell_class](api/template/timeline_cell_class.md)

### Change log
- v8.0에 추가됨

