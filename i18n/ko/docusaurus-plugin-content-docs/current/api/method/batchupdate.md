---
sidebar_label: batchUpdate
title: batchUpdate method
description: "여러 작업/링크를 한 번에 업데이트합니다"
---

# batchUpdate

### Description

@short: 여러 작업/링크를 한 번에 업데이트합니다

@signature: batchUpdate: (callback: GanttCallback, noRedraw?: boolean) =\> void

### Parameters

- `callback` - (required) *function* - 콜백 함수
- `noRedraw` - (optional) *boolean* - 선택 사항으로, 콜백 함수 실행 후 Gantt 차트를 다시 그릴지 여부를 결정합니다; <i>true</i>는 다시 그리지 않음을 의미하며, <i>false</i> (기본값)는 다시 그리기를 트리거합니다

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
- [Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

이 메서드는 여러 작업 또는 링크를 동시에 업데이트하여, 각각의 업데이트가 별도의 다시 그리기를 발생시키는 것을 방지하고 한 번의 재렌더링만 수행할 수 있게 합니다.

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)

