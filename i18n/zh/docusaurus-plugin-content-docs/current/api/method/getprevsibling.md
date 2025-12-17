---
sidebar_label: getPrevSibling
title: getPrevSibling method
description: "获取同一级别中前一个任务的 id"
---

# getPrevSibling

### Description

@short: 获取同一级别中前一个任务的 id

@signature: getPrevSibling: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    任务的 id

### Returns
- ` prevSibling` - (string, number) - 前一个兄弟任务的 id

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"项目 #1", start_date:"01-04-2013", duration:18, 
     open:true},
     {id:"t_1", text:"任务 #1", start_date:"02-04-2013", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"任务 #2", start_date:"11-04-2013", duration:8,
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
- [任务的父子关系](guides/task-tree-operations.md)

