---
sidebar_label: getPrev
title: getPrev method
description: "이전 항목의 id를 가져옵니다. 이때 항목의 중첩 레벨에 상관없이 동일한 레벨이든 다른 레벨이든 관계없습니다."
---

# getPrev

### Description

@short: 이전 항목의 id를 가져옵니다. 이때 항목의 중첩 레벨에 상관없이 동일한 레벨이든 다른 레벨이든 관계없습니다.

@signature: getPrev: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    작업(task) id

### Returns
- ` id` - (string, number) - 지정한 작업 이전에 위치한 작업의 id

### Example

~~~jsx
const tasks = {
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

gantt.getPrev("p_1"); ->  null /*!*/
gantt.getPrev("t_1"); -> "p_1" /*!*/
gantt.getPrev("t_2"); -> "t_1"  /*!*/
~~~

### Related API
- [getNext](api/method/getnext.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)
- [getSiblings](api/method/getsiblings.md)
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)

### Related Guides
- [Task Parent/Child](guides/task-tree-operations.md)

