---
sidebar_label: selectTask
title: selectTask method
description: "选择指定的任务"
---

# selectTask

### Description

@short: 选择指定的任务

@signature: selectTask: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -        任务的ID

### Returns
- ` id` - (string | number) - 被选中任务的ID

### Example

~~~jsx
var tasks = {
  data:[
     {id:"p_1", text:"项目 #1", start_date:"01-04-2013", duration:18, open:true},
     {id:"t_1", text:"任务 #1", start_date:"02-04-2013", duration:8, parent:"p_1"},
     {id:"t_2", text:"任务 #2", start_date:"11-04-2013", duration:8, parent:"p_1"}
   ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.selectTask("t_1"); /*!*/
~~~

### Details

此方法会触发 [onTaskSelected](api/event/ontaskselected.md) 事件。

### Related API
- [unselectTask](api/method/unselecttask.md)
- [getSelectedId](api/method/getselectedid.md)

