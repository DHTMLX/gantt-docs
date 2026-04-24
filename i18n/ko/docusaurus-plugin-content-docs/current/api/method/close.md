---
sidebar_label: close
title: close method
description: "지정된 ID를 가진 브랜치를 닫습니다"
---

# close

### Description

@short: 지정된 ID의 브랜치를 닫습니다

@signature: close: (id: string | number) =\> void

### Parameters

- `id` - (필수) *string | number* -    브랜치 ID

### Example

~~~jsx
var tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.close("p_1");/*!*/
~~~

### Details

참고: 이 메서드는 onTaskClosed 이벤트를 발생시킵니다. [onTaskClosed](api/event/ontaskclosed.md)

### Related API
- [open](api/method/open.md)
- [onTaskClosed](api/event/ontaskclosed.md)

### Related Guides
- [트리 컬럼 구성하기](guides/tree-column.md)

