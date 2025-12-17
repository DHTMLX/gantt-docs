---
sidebar_label: getNextSibling
title: getNextSibling method
description: "提供同一级别下一个任务的id"
---

# getNextSibling

### Description

@short: 提供同一级别下一个任务的id

@signature: getNextSibling: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    任务的id

### Returns
- ` id` - (string | number) - 下一个同级任务的id

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
gantt.getNextSibling("t_2"); ->  null (如果没有下一个同级任务) /*!*/
~~~

### Related API
- [getPrevSibling](api/method/getprevsibling.md)
- [getSiblings](api/method/getsiblings.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

### Related Guides
- [任务的父子关系](guides/task-tree-operations.md)

