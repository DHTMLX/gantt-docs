---
sidebar_label: getNext
title: getNext method
description: "returns the id of the next item (no matter what the level of nesting is: the same or different)"
---

# getNext

### Description

@short: Returns the id of the next item (no matter what the level of nesting is: the same or different)

@signature: getNext: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    the task id

### Returns
- ` id` - (string | number) - the id of the next item

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
- [Task Parent/Child](guides/task-tree-operations.md)

