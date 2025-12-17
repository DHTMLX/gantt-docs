---
sidebar_label: getParent
title: getParent method
description: "获取父任务的id"
---

# getParent

### Description

@short: 获取父任务的id

@signature: getParent: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    任务的id

### Returns
- ` id` - (string | number) - 父任务的id。如果指定的任务没有父任务，则返回根任务的id

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

gantt.getParent("t_1"); //-> "p_1" /*!*/
gantt.getParent("p_1"); //-> 0 (默认根id) /*!*/
~~~

### Related API
- [root_id](api/config/root_id.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)
- [getSiblings](api/method/getsiblings.md)

### Related Guides
- [任务的父子关系](guides/task-tree-operations.md)

