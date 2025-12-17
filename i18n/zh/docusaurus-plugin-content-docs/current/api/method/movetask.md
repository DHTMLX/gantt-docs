---
sidebar_label: moveTask
title: moveTask method
description: "将任务移动到不同的位置"
---

# moveTask

### Description

@short: 将任务移动到不同的位置

@signature: moveTask: (sid: string | number, tindex: number, parent?: string | number) =\> boolean | void

### Parameters

- `sid` - (required) *string | number* -            要移动的任务标识符
- `tindex` - (required) *number* - 目标位置索引，任务将被放置在此处 <br>（分支内的索引）
- `parent` - (optional) *string | number* -            父节点ID。如果提供，<b>tindex</b>表示在该 <br> <b>'parent'</b> 分支内的索引

### Returns
- ` result` - (boolean | void) - 如果通过 [onBeforeTaskMove](api/event/onbeforetaskmove.md) 事件取消移动，则返回 `false`，否则返回 `undefined`

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"项目 #1", start_date:"01-04-2023", duration:18, 
     open:true},
     {id:"t_1", text:"任务 #1", start_date:"02-04-2023", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"任务 #2", start_date:"11-04-2023", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.moveTask("t_1", 1); /*!*/
//-> 这将把任务 "t_1" 移动到根级别
~~~

### Related API
- [getTaskIndex](api/method/gettaskindex.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)

