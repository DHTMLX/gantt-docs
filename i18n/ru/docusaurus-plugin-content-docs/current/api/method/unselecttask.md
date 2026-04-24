---
sidebar_label: unselectTask
title: Методы unselectTask
description: "удаляет выделение из выбранной задачи"
---

# unselectTask

### Description

@short: Удаляет выделение из выбранной задачи

@signature: unselectTask: (id?: string | number) => void

### Parameters

- `id` - (optional) *string | number* - необязателен, идентификатор задачи, у которой нужно снять выделение, см. детали

### Example

~~~jsx
var tasks = {
 data:[
   {id:"p_1",  text:"Project #1", start_date:"01-04-2013", duration:18, open:true},
   {id:"t_1",  text:"Task #1",    start_date:"02-04-2013", duration:8,  parent:"p_1"},
   {id:"t_2",  text:"Task #2",    start_date:"11-04-2013", duration:8,  parent:"p_1"}
 ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.selectTask("t_1"); 
gantt.unselectTask(); /*!*/
~~~

### Details

Метод вызывает событие [onTaskUnselected](api/event/ontaskunselected.md).

В случае включения [множественного выделения задач](guides/multiselection.md) и если выделено несколько задач, необходимо передать в качестве параметра идентификатор задачи, из которой нужно снять выделение.

### Related API
- [selectTask](api/method/selecttask.md)
- [getSelectedId](api/method/getselectedid.md)