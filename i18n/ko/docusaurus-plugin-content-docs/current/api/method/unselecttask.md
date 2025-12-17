---
sidebar_label: unselectTask
title: unselectTask method
description: "선택된 작업에서 선택을 제거합니다"
---

# unselectTask

### Description

@short: 선택된 작업에서 선택을 제거합니다

@signature: unselectTask: (id?: string | number) =\> void

### Parameters

- `id` - (optional) *string | number* - 선택 사항, 선택 해제할 작업의 id, 자세한 내용은 아래 참조

### Example

~~~jsx
var tasks = {
 data:[
   {id:"p_1",  text:"Project #1", start_date:"01-04-2013", duration:18, open:true},
   {id:"t_1",  text:"Task #1",    start_date:"02-04-2013", duration:8,  parent:"p_1"},
   {id:"t_2",  text:"Task #2",    start_date:"11-04-2013", duration:8,  parent:"p_1"}
 ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.selectTask("t_1"); 
gantt.unselectTask(); /*!*/
~~~

### Details

이 메서드는 [onTaskUnselected](api/event/ontaskunselected.md) 이벤트를 트리거합니다.

[멀티 작업 선택](guides/multiselection.md)이 활성화되어 여러 작업이 선택된 경우, 선택 해제할 작업의 id를 파라미터로 제공해야 합니다.

### Related API
- [selectTask](api/method/selecttask.md)
- [getSelectedId](api/method/getselectedid.md)

