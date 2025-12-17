---
sidebar_label: getSelectedId
title: getSelectedId method
description: "提供当前选中任务的id"
---

# getSelectedId

### Description

@short: 提供当前选中任务的id

@signature: getSelectedId: () =\> string

### Returns
- ` id` - (string) - 选中任务的id，如果甘特图中没有选中任务，则返回 <i>null</i>

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8, parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8, parent:"p_1"}
   ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.selectTask("t_1"); 
gantt.getSelectedId(); // -> "t_1" /*!*/
~~~

### Related API
- [selectTask](api/method/selecttask.md)
- [unselectTask](api/method/unselecttask.md)

