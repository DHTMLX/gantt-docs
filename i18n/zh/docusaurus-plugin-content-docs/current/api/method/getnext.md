---
sidebar_label: getNext
title: getNext method
description: "提供下一个项目的 id，无论其嵌套层级如何，无论是否属于同一层级或不同层级"
---

# getNext

### Description

@short: 提供下一个项目的 id，无论其嵌套层级如何，无论是否属于同一层级或不同层级

@signature: getNext: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    任务的 id

### Returns
- ` id` - (string | number) - 下一个项目的 id

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
- [任务的父子关系](guides/task-tree-operations.md)

