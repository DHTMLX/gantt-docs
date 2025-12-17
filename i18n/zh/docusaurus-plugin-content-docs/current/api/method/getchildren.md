---
sidebar_label: getChildren
title: getChildren method
description: "获取指定父节点的直接子任务"
---

# getChildren

### Description

@short: 获取指定父节点的直接子任务

@signature: getChildren: (id: string | number) =\> any[]

### Parameters

- `id` - (required) *string | number* -        父节点的id

### Returns
- ` ids` - (array) - 包含子任务id的数组

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

gantt.getChildren("p_1");//->["t_1", "t_2"] /*!*/
~~~

### Related samples
- [Basic filtering](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

### Details

另一种遍历特定任务子任务的方法是使用 [eachTask](api/method/eachtask.md)。

### Related API
- [hasChild](api/method/haschild.md)
- [getNext](api/method/getnext.md)
- [getPrev](api/method/getprev.md)
- [getSiblings](api/method/getsiblings.md)
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)
- [eachTask](api/method/eachtask.md)

### Related Guides
- [配置树形列](guides/tree-column.md)

