---
sidebar_label: unselectTask
title: unselectTask method
description: "从已选中的任务中移除选择"
---

# unselectTask

### Description

@short: 从已选中的任务中移除选择

@signature: unselectTask: (id?: string | number) =\> void

### Parameters

- `id` - (optional) *string | number* - 可选，要取消选择的任务ID，详情见下文

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

此方法会触发 [onTaskUnselected](api/event/ontaskunselected.md) 事件。

当启用[多任务选择](guides/multiselection.md)且选中了多个任务时，您需要提供想要取消选择的任务ID作为参数。

### Related API
- [selectTask](api/method/selecttask.md)
- [getSelectedId](api/method/getselectedid.md)

