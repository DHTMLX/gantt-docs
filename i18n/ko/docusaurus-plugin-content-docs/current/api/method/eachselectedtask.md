---
sidebar_label: eachSelectedTask
title: eachSelectedTask method
description: "간트 차트에서 선택된 모든 작업을 순회합니다."
---

# eachSelectedTask

### Description

@short: 간트 차트에서 선택된 모든 작업을 순회합니다.

@signature: eachSelectedTask: (code: GanttCallback) =\> void

### Parameters

- `code` - (required) *function* - 선택된 각 작업에 대해 실행될 함수입니다. 이 함수는 작업 ID를 인자로 받습니다.

### Example

~~~jsx
gantt.batchUpdate(function () {
    gantt.eachSelectedTask(function(task_id){
        if(gantt.isTaskExists(task_id))
            gantt.deleteTask(task_id);
    });
});
~~~

### Related samples
- [Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

:::note
 이 메서드는 **multiselect** 확장의 일부이므로, 반드시 [multiselect](guides/extensions-list.md#multitaskselection) 플러그인을 활성화해야 합니다. 자세한 내용은 [멀티 태스크 선택](guides/multiselection.md) 문서를 참조하세요. 
:::

### Related API
- [eachTask](api/method/eachtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)
- [batchUpdate](api/method/batchupdate.md)

### Related Guides
- [멀티 태스크 선택](guides/multiselection.md)

