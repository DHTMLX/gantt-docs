---
sidebar_label: unselectTask
title: unselectTask method
description: "удаляет выделение с выбранной задачи"
---

# unselectTask

### Description

@short: Удаляет выделение с выбранной задачи

@signature: unselectTask: (id?: string | number) =\> void

### Parameters

- `id` - (optional) *string | number* - необязательно, id задачи, с которой нужно снять выделение, подробности см. ниже

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

Этот метод вызывает событие [onTaskUnselected](api/event/ontaskunselected.md).

Когда активна [множественный выбор задач](guides/multiselection.md) и выбрано несколько задач, необходимо передать id задачи, которую нужно снять с выделения, в качестве параметра.

### Related API
- [selectTask](api/method/selecttask.md)
- [getSelectedId](api/method/getselectedid.md)

