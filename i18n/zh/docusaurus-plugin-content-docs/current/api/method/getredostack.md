---
sidebar_label: getRedoStack
title: getRedoStack 方法
description: "返回存储的重做用户操作的栈"
---

# getRedoStack

### Description

@short: 提供存储的重做用户操作堆栈

@signature: getRedoStack: () => UndoRedoAction[]

### Returns
- `stack` - (UndoRedoAction[]) - 重做用户操作的数组

### Example

~~~jsx
var stack = gantt.getRedoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 此方法属于 **undo** 扩展，因此请确保已启用 [undo](guides/extensions-list.md) 插件。更多详情请参见 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::

返回堆栈是 redo 用户操作的数组。每个用户操作包含一组命令。一个命令是具有以下属性的对象：
 
- **type** - (*string*) 命令的类型: "add/remove/update"
- **entity** - (*string*) 被更改对象的类型: "task" 或 "link"
- **value** - (*object*) 被更改的 task/link 对象 
- **oldValue** - (*object*) 变更前的 task/link 对象

请看下面的示例：

**getRedoStack()** 方法返回一个包含 3 个 redo 用户操作的堆栈。前两个操作各包含 1 条命令，第三个操作包含 3 条命令。

### Related API
- [getUndoStack](api/method/getundostack.md)
- [redo](api/method/redo.md)
- [clearRedoStack](api/method/clearredostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- 新增于版本 4.0