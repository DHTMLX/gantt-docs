---
sidebar_label: getTaskIndex
title: getTaskIndex 方法
description: "获取分支中任务的索引"
---

# getTaskIndex

### Description

@short: 获取分支中任务的索引

@signature: getTaskIndex: (id: string | number) =\> number

### Parameters

- `id` - (必填) *string | number* - 该任务的 ID

### Returns
- ` index` - (number) - 分支中的任务索引（从 0 开始编号）

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, 
         open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8,
         parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8,
         parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

const taskIndex = gantt.getTaskIndex("t_1"); // -> 0 /*!*/
const globalTaskIndex = gantt.getGlobalTaskIndex("t_1"); // -> 1
~~~ 

### Related samples
- [多选和任务缩进/取消缩进](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Related API
- [getGlobalTaskIndex](api/method/getglobaltaskindex.md)