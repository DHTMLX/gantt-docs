---
sidebar_label: getSiblings
title: getSiblings method
description: "提供指定任务的兄弟任务，包括任务本身"
---

# getSiblings

### Description

@short: 提供指定任务的兄弟任务，包括任务本身

@signature: getSiblings: (id: string | number) =\> any[]

### Parameters

- `id` - (required) *string | number* -    任务的ID

### Returns
- ` siblings` - (array) - 包含任务兄弟任务ID的数组

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
 
gantt.getSiblings("t_1"); ->  ["t_1", "t_2] /*!*/
~~~

### Details

兄弟任务是指在任务层级中处于同一级别的任务

### Related API
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

