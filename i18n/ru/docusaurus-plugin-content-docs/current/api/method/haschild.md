---
sidebar_label: hasChild
title: hasChild method
description: "возвращает количество дочерних задач"
---

# hasChild

### Description

@short: Возвращает количество дочерних задач

@signature: hasChild: (id: string | number) =\> number | undefined

### Parameters

- `id` - (required) *string | number* -    идентификатор задачи

### Returns
- ` childs` - (number | undefined) - количество дочерних задач, если они существуют, или "undefined", если дочерних задач нет

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

gantt.hasChild("p_1"); //-> 2 /*!*/
gantt.hasChild("t_1"); //-> undefined /*!*/
~~~

### Related API
- [getChildren](api/method/getchildren.md)
- [getNext](api/method/getnext.md)
- [getPrev](api/method/getprev.md)
- [getSiblings](api/method/getsiblings.md)
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)

