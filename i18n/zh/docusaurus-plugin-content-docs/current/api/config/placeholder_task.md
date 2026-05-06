---
sidebar_label: placeholder_task
title: placeholder_task 配置
description: "在任务列表末尾添加一个空行，以简化通过键盘编辑任务"
---

# placeholder_task

### Description

@short: 在任务列表末尾添加一个空行，以简化通过键盘编辑任务

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

**默认值：** false

### Related samples
- [行内编辑 - 键盘导航模式](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)

### Details

- 一个占位符任务会自动被添加到任务列表的末尾。
- 一旦它在 UI 中被修改并接收到 **gantt.updateTask()** 调用，一个新任务将被添加到列表的末尾。
- 可以通过它的 type 值来检测占位符：

~~~js
if(task.type == gantt.config.types.placeholder){
   // 执行某些操作
}
~~~

- Gantt 将在插入占位符时触发 [onTaskCreated](api/event/ontaskcreated.md) 和 [onAfterTaskAdd](api/event/onaftertaskadd.md) 事件。
- [gantt.dataProcessor](guides/server-side.md) 将为占位符项触发 **onBeforeUpdate** 事件，但不会产生任何后端请求。

### Related Guides
- [Grid 中的行内编辑](guides/inline-editing.md#inline-editing-modes)