---
sidebar_label: getPrevSibling
title: getPrevSibling method
description: "возвращает id предыдущей задачи на том же уровне"
---

# getPrevSibling

### Description

@short: Возвращает id предыдущей задачи на том же уровне

@signature: getPrevSibling: (id: string | number) => string | number

### Parameters

- `id` - (обязательный) *string | number* - идентификатор задачи

### Returns
- ` prevSibling` - (string, number) - идентификатор предыдущего соседа

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
 
gantt.getPrevSibling("t_2"); ->  "t_1" /*!*/
gantt.getPrevSibling("t_1"); ->  null (if no previous sibling) /*!*/
~~~

### Related API
- [getNextSibling](api/method/getnextsibling.md)
- [getSiblings](api/method/getsiblings.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

### Related Guides
- [Task Parent/Child](guides/task-tree-operations.md)