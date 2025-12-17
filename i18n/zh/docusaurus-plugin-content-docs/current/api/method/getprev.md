---
sidebar_label: getPrev
title: getPrev method
description: "获取前一个项目的id，无论其嵌套层级如何--无论是在同一层级还是不同层级。"
---

# getPrev

### Description

@short: 获取前一个项目的id，无论其嵌套层级如何--无论是在同一层级还是不同层级。

@signature: getPrev: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    任务的id

### Returns
- ` id` - (string, number) - 指定任务之前的任务id

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
- [任务的父子关系](guides/task-tree-operations.md)

