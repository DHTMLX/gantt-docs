---
sidebar_label: getSiblings
title: getSiblings method
description: "returns siblings of the specified task (including itself)"
---

# getSiblings

### Description

@short: Returns siblings of the specified task (including itself)

@signature: getSiblings: (id: string | number) =\> any[]

### Parameters

- `id` - (required) *string | number* -    the task id

### Returns
- ` siblings` - (array) - the ids of the task's siblings

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

Siblings are tasks of the same tree level

### Related API
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

