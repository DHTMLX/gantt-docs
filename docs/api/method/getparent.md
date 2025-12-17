---
sidebar_label: getParent
title: getParent method
description: "returns the id of the parent task"
---

# getParent

### Description

@short: Returns the id of the parent task

@signature: getParent: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    the task id

### Returns
- ` id` - (string | number) - the id of the parent task. Root's id if there is no parent for the specified task

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
gantt.getParent("p_1"); //-> 0 (the default root id) /*!*/
~~~

### Related API
- [root_id](api/config/root_id.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)
- [getSiblings](api/method/getsiblings.md)

### Related Guides
- [Task Parent/Child](guides/task-tree-operations.md)

