---
sidebar_label: unselectTask
title: unselectTask method
description: "从已选中的任务中移除选择"
---

# unselectTask

### Description

@short: 从所选任务中取消选中状态

@signature: unselectTask: (id?: string | number) =\> void

### Parameters

- `id`	-	(optional) *string | number*	-		可选，需取消选中状态的任务的 id，请参见详情

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

该方法会触发 [onTaskUnselected](api/event/ontaskunselected.md) 事件。

若启用了 [multi-task selection](guides/multiselection.md) 功能且存在多个已选任务，需作为参数传入要取消选中状态的任务的 id。

### Related API
- [selectTask](api/method/selecttask.md)
- [getSelectedId](api/method/getselectedid.md)