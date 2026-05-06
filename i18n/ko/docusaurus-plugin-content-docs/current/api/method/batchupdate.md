---
sidebar_label: batchUpdate
title: batchUpdate 메서드
description: "다수의 작업/링크를 한 번에 업데이트합니다"
---

# batchUpdate

### Description

@short: 다수의 작업/링크를 한 번에 업데이트합니다

@signature: batchUpdate: (callback: GanttCallback, noRedraw?: boolean) =\> void

### Parameters

- `callback` - (required) *function* - 콜백 함수
- `noRedraw` - (optional) *boolean* - 콜백 함수 실행 후 차트를 다시 렌더링할지 여부를 지정합니다; true - 재렌더링하지 않음, false(기본값) - 재렌더링함

### Example

~~~jsx
gantt.batchUpdate(function () {
    var tasks = gantt.getTaskByTime();
    for(var i = 0; i < tasks.length; i++){
        var task = tasks[i];
        task.start_date = gantt.date.add(task.start_date, 1, "day");
        task.end_date = gantt.calculateEndDate(task.start_date, task.duration);
        gantt.updateTask(task.id);
    }
});
~~~

### Related samples
- [다중 선택 및 들여쓰기/내어쓰기 작업](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

다수의 작업/링크를 한 번의 렌더링으로 업데이트하는 데 이 메서드를 사용할 수 있으며, 여러 번의 재렌더링으로 여러 업데이트를 수행하는 대신 단일 재렌더링으로 처리할 수 있습니다.

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)