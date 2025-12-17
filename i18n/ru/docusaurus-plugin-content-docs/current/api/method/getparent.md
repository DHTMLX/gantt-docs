---
sidebar_label: getParent
title: getParent method
description: "получает id родительской задачи"
---

# getParent

### Description

@short: Получает id родительской задачи

@signature: getParent: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -        id задачи

### Returns
- ` id` - (string | number) - id родительской задачи. Возвращает id корня, если у указанной задачи нет родителя

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
gantt.getParent("p_1"); //-> 0 (id корня по умолчанию) /*!*/
~~~

### Related API
- [root_id](api/config/root_id.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)
- [getSiblings](api/method/getsiblings.md)

### Related Guides
- [Task Parent/Child](guides/task-tree-operations.md)

