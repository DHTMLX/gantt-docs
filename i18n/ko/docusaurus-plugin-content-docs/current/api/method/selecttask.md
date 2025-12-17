---
sidebar_label: selectTask
title: selectTask method
description: "지정된 태스크를 선택합니다"
---

# selectTask

### Description

@short: 지정된 태스크를 선택합니다

@signature: selectTask: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -        태스크 ID

### Returns
- ` id` - (string | number) - 선택된 태스크의 ID

### Example

~~~jsx
var tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8, parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8, parent:"p_1"}
   ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.selectTask("t_1"); /*!*/
~~~

### Details

이 메서드는 [onTaskSelected](api/event/ontaskselected.md) 이벤트를 트리거합니다.

### Related API
- [unselectTask](api/method/unselecttask.md)
- [getSelectedId](api/method/getselectedid.md)

