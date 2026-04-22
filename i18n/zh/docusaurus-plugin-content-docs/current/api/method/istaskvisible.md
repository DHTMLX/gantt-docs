---
sidebar_label: isTaskVisible
title: isTaskVisible 方法
description: "检查当前在甘特图中是否呈现指定的任务"
---

# isTaskVisible

### Description

@short: 检查指定任务当前是否在甘特图中呈现

@signature: isTaskVisible: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* -        任务的 ID

### Returns
- ` isvisible` - (boolean) - <i>true</i>，若任务当前在甘特图中呈现。否则，<i>false</i>

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
 
gantt.isTaskVisible("t_1"); // ->true  /*!*/
~~~