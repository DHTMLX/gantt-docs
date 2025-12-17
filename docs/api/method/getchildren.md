---
sidebar_label: getChildren
title: getChildren method
description: "returns the 1st-level child tasks of the specified parent branch"
---

# getChildren

### Description

@short: Returns the 1st-level child tasks of the specified parent branch

@signature: getChildren: (id: string | number) =\> any[]

### Parameters

- `id` - (required) *string | number* -        the parent branch's id

### Returns
- ` ids` - (array) - an array of children's ids

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

Another method to iterate over child tasks of some task is [eachTask](api/method/eachtask.md).

### Related API
- [hasChild](api/method/haschild.md)
- [getNext](api/method/getnext.md)
- [getPrev](api/method/getprev.md)
- [getSiblings](api/method/getsiblings.md)
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)
- [eachTask](api/method/eachtask.md)

### Related Guides
- [Configuring the Tree Column](guides/tree-column.md)

