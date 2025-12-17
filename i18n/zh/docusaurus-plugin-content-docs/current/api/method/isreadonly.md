---
sidebar_label: isReadonly
title: isReadonly method
description: "确定指定的任务、链接或整个甘特图是否设置为只读模式"
---

# isReadonly

### Description

@short: 确定指定的任务、链接或整个甘特图是否设置为只读模式

@signature: isReadonly: (item?: number | string | Task | Link) =\> boolean

### Parameters

- `item` - (optional) *number | string | Task | Link* -    可选，表示任务或链接的ID或对象。如果省略，则方法检查整个甘特图是否为只读状态

### Returns
- ` mode` - (boolean) - <i>true</i> 表示指定的任务/链接或整个甘特图为只读；否则为 <i>false</i>

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2023",
    duration:28
}, "project_2");

gantt.isReadonly(10); // ->false

// 或者 
gantt.isReadonly(gantt.getTask(10)); // -> false
~~~

### Related Guides
- [只读模式](guides/readonly-mode.md)
