---
sidebar_label: getPrev
title: getPrev метод
description: "возвращает идентификатор предыдущего элемента (независимо от уровня вложенности: один и тот же или другой)"
---

# getPrev

### Description

@short: Возвращает идентификатор предыдущего элемента (независимо от уровня вложенности: один и тот же или другой)

@signature: getPrev: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* - идентификатор задачи

### Returns
- `id` - (string, number) - идентификатор предыдущей задачи

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