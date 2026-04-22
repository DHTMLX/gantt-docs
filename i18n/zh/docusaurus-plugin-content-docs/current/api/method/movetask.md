---
sidebar_label: moveTask
title: moveTask method
description: "将任务移动到新位置"
---

# moveTask

### Description

@short: 将任务移动到新位置

@signature: moveTask: (sid: string | number, tindex: number, parent?: string | number) =\> boolean | void

### Parameters

- `sid` - (required) *string | number* -            要移动的任务的 ID
- `tindex` - (required) *number* - 将要移动到的位置的索引 <br/> (分支中的索引)
- `parent`	- (optional) *string | number*		- 父级 ID。若指定，<b>tindex</b> 将引用在 <br/> <b>'parent'</b> 分支中的索引

### Returns
- ` result` - (boolean | void) - 当操作因使用 [onBeforeTaskMove](api/event/onbeforetaskmove.md) 被取消时，返回 `false`；否则返回 `undefined`

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2023", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2023", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2023", duration:8,
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