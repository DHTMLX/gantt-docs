---
sidebar_label: getPrevSibling
title: getPrevSibling 方法
description: "返回同一级别的前一个任务的 ID"
---

# getPrevSibling

### Description

@short: 返回同一级别的前一个任务的 ID

@signature: getPrevSibling: (id: string | number) =\> string | number

### Parameters

- `id` - (必填) *string | number* -  任务 ID

### Returns
- `prevSibling` - (string, number) - 前一个同级的任务 ID

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
 
gantt.getPrevSibling("t_2"); ->  "t_1" /*!*/
gantt.getPrevSibling("t_1"); ->  null (如果没有前一个兄弟任务) /*!*/
~~~

### Related API
- [getNextSibling](api/method/getnextsibling.md)
- [getSiblings](api/method/getsiblings.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

### Related Guides
- [Task Parent/Child](guides/task-tree-operations.md)