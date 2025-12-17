---
sidebar_label: close
title: close method
description: "주어진 id로 식별되는 브랜치를 닫습니다."
---

# close

### Description

@short: 주어진 id로 식별되는 브랜치를 닫습니다.

@signature: close: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    브랜치의 id

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

이 메서드는 [onTaskClosed](api/event/ontaskclosed.md) 이벤트를 트리거한다는 점을 유의하세요.

### Related API
- [open](api/method/open.md)
- [onTaskClosed](api/event/ontaskclosed.md)

### Related Guides
- [트리 컬럼 구성하기](guides/tree-column.md)

