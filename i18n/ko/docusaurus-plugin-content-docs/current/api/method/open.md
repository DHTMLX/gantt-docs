---
sidebar_label: open
title: open method
description: "주어진 id로 식별된 브랜치를 open합니다."
---

# open

### Description

@short: 주어진 id로 식별된 브랜치를 open합니다.

@signature: open: (id: string | number) =\> void

### Parameters

- `id` - (required) *string* - | number    브랜치의 id

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2023", duration:18},
     {id:"t_1", text:"Task #1", start_date:"02-04-2023", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2023", duration:8,
     parent:"p_1"}
   ]
};

gantt.init("gantt_here");
gantt.parse(tasks);
gantt.open("p_1"); /*!*/
~~~

### Details

이 메서드는 [onTaskOpened](api/event/ontaskopened.md) 이벤트를 트리거합니다.

### Related API
- [close](api/method/close.md)

### Related Guides
- [트리 컬럼 구성하기](guides/tree-column.md)

