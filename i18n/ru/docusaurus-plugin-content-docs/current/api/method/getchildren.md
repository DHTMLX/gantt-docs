---
sidebar_label: getChildren
title: getChildren метод
description: "возвращает задачи 1-го уровня дочерние для указанной родительской ветви"
---

# getChildren

### Description

@short: Возвращает задачи 1-го уровня дочерние для указанной родительской ветви

@signature: getChildren: (id: string | number) =\> any[]

### Parameters

- `id` - (обязательный) *string | number* - идентификатор родительской ветви

### Returns
- ` ids` - (массив) - массив идентификаторов дочерних задач

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
- [Базовая фильтрация](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

### Details

Еще один метод перебора дочерних задач некоторой задачи — [eachTask](api/method/eachtask.md).

### Related API
- [hasChild](api/method/haschild.md)
- [getNext](api/method/getnext.md)
- [getPrev](api/method/getprev.md)
- [getSiblings](api/method/getsiblings.md)
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)
- [eachTask](api/method/eachtask.md)

### Related Guides
- [Настройка столбца дерева](guides/tree-column.md)