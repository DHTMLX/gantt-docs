---
sidebar_label: close
title: close method
description: "закрывает ветку, идентифицированную заданным id"
---

# close

### Description

@short: Закрывает ветку, идентифицированную заданным id

@signature: close: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -   id ветки

### Example

~~~jsx
var tasks = {
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

gantt.close("p_1");/*!*/
~~~

### Details

Учтите, что этот метод вызывает событие [onTaskClosed](api/event/ontaskclosed.md).

### Related API
- [open](api/method/open.md)
- [onTaskClosed](api/event/ontaskclosed.md)

### Related Guides
- [Настройка древовидной колонки](guides/tree-column.md)

