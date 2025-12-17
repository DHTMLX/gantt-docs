---
sidebar_label: getChildren
title: getChildren method
description: "получает непосредственные дочерние задачи для указанной родительской ветки"
---

# getChildren

### Description

@short: Получает непосредственные дочерние задачи для указанной родительской ветки

@signature: getChildren: (id: string | number) =\> any[]

### Parameters

- `id` - (required) *string | number* -       идентификатор родительской ветки

### Returns
- ` ids` - (array) - массив, содержащий идентификаторы дочерних задач

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

Другой способ пройтись по дочерним задачам конкретной задачи - использовать [eachTask](api/method/eachtask.md).

### Related API
- [hasChild](api/method/haschild.md)
- [getNext](api/method/getnext.md)
- [getPrev](api/method/getprev.md)
- [getSiblings](api/method/getsiblings.md)
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)
- [eachTask](api/method/eachtask.md)

### Related Guides
- [Настройка древовидной колонки](guides/tree-column.md)

