---
sidebar_label: getNextSibling
title: getNextSibling 方法
description: "返回同一级别的下一个任务的 id"
---

# getNextSibling

### Description

@short: 返回同一级别的下一个任务的 id

@signature: getNextSibling: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    the task id

### Returns
- ` id` - (string | number) - 下一个同级任务的 id

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
- [Task Parent/Child](guides/task-tree-operations.md)