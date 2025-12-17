---
sidebar_label: selectTask
title: selectTask method
description: "выбирает указанную задачу"
---

# selectTask

### Description

@short: Выбирает указанную задачу

@signature: selectTask: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -        идентификатор задачи

### Returns
- ` id` - (string | number) - идентификатор выбранной задачи

### Example

~~~jsx
var tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8, parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8, parent:"p_1"}
   ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.selectTask("t_1"); /*!*/
~~~

### Details

Этот метод вызывает событие [onTaskSelected](api/event/ontaskselected.md).

### Related API
- [unselectTask](api/method/unselecttask.md)
- [getSelectedId](api/method/getselectedid.md)

