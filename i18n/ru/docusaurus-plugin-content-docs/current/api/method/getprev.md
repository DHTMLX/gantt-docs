---
sidebar_label: getPrev
title: getPrev method
description: "получает id предыдущего элемента, независимо от его уровня вложенности - будь то тот же уровень или другой."
---

# getPrev

### Description

@short: Получает id предыдущего элемента, независимо от его уровня вложенности - будь то тот же уровень или другой.

@signature: getPrev: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    id задачи

### Returns
- ` id` - (string, number) - id задачи, которая идет перед указанной

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

gantt.getPrev("p_1"); ->  null /*!*/
gantt.getPrev("t_1"); -> "p_1" /*!*/
gantt.getPrev("t_2"); -> "t_1"  /*!*/
~~~

### Related API
- [getNext](api/method/getnext.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)
- [getSiblings](api/method/getsiblings.md)
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)

### Related Guides
- [Task Parent/Child](guides/task-tree-operations.md)

