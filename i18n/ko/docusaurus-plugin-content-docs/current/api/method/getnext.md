---
sidebar_label: getNext
title: getNext method
description: "중첩 레벨에 상관없이, 동일하거나 다른 항목이든 다음 항목의 id를 제공합니다."
---

# getNext

### Description

@short: 중첩 레벨에 상관없이, 동일하거나 다른 항목이든 다음 항목의 id를 제공합니다.

@signature: getNext: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    작업 id

### Returns
- ` id` - (string | number) - 다음 항목의 id

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

gantt.getNext("p_1"); -> "t_1" /*!*/
gantt.getNext("t_1"); -> "t_2" /*!*/
gantt.getNext("t_2"); -> null  /*!*/
~~~

### Related API
- [getPrev](api/method/getprev.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)
- [getSiblings](api/method/getsiblings.md)
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)

### Related Guides
- [Task Parent/Child](guides/task-tree-operations.md)

