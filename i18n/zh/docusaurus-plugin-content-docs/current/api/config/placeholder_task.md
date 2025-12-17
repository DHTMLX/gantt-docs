---
sidebar_label: placeholder_task
title: placeholder_task config
description: "在任务列表末尾添加一个空行，以便更方便地使用键盘编辑任务"
---

# placeholder_task

### Description

@short: 在任务列表末尾添加一个空行，以便更方便地使用键盘编辑任务

@signature: placeholder_task: any

### Example

~~~jsx
gantt.config.placeholder_task = true;

// 或者
gantt.config.placeholder_task = {
   // 添加新任务后，将焦点移到 placeholder task 上
   focusOnCreate: true
};
~~~

**Default value:** false

### Related samples
- [Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)

### Details

- 在任务列表末尾会自动添加一个空的 placeholder 任务。
- 当通过 UI 编辑 placeholder 并调用 **gantt.updateTask()** 时，会在末尾添加一个新任务。
- 你可以通过检查任务的 type 属性来识别 placeholder:

~~~js
if(task.type == gantt.config.types.placeholder){
   // 执行某些操作
}
~~~


- 当添加 placeholder 时，Gantt 会触发 [onTaskCreated](api/event/ontaskcreated.md) 和 [onAfterTaskAdd](api/event/onaftertaskadd.md) 事件。
- [gantt.dataProcessor](guides/server-side.md) 会为 placeholder 触发 **onBeforeUpdate** 事件，但不会发送任何后端请求。

### Related Guides
- [在网格中进行内联编辑](guides/inline-editing.md#neilianbianjimoshi)

