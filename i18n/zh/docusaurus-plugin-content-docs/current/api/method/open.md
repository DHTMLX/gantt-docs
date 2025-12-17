---
sidebar_label: open
title: open method
description: "打开由给定 id 标识的 branch"
---

# open

### Description

@short: 打开由给定 id 标识的 branch

@signature: open: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    branch 的 id

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2023", duration:18},
     {id:"t_1", text:"Task #1", start_date:"02-04-2023", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2023", duration:8,
     parent:"p_1"}
   ]
};

gantt.init("gantt_here");
gantt.parse(tasks);
gantt.open("p_1"); /*!*/
~~~

### Details

此方法会触发 [onTaskOpened](api/event/ontaskopened.md) 事件。

### Related API
- [close](api/method/close.md)

### Related Guides
- [配置树形列](guides/tree-column.md)

