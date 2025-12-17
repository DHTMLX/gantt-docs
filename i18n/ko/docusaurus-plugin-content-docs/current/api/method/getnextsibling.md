---
sidebar_label: getNextSibling
title: getNextSibling method
description: "동일 레벨에서 다음 작업의 id를 제공합니다"
---

# getNextSibling

### Description

@short: 동일 레벨에서 다음 작업의 id를 제공합니다

@signature: getNextSibling: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    작업의 id

### Returns
- ` id` - (string | number) - 다음 형제 작업의 id

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
 
gantt.getNextSibling("t_1"); ->  "t_2"  /*!*/
gantt.getNextSibling("t_2"); ->  null (다음 형제가 없을 경우) /*!*/
~~~

### Related API
- [getPrevSibling](api/method/getprevsibling.md)
- [getSiblings](api/method/getsiblings.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

### Related Guides
- [Task Parent/Child](guides/task-tree-operations.md)

