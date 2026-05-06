---
sidebar_label: getUndoStack
title: getUndoStack 方法
description: "返回存储的撤销用户操作栈"
---

# getUndoStack

### Description

@short: 返回存储的撤销用户操作栈

@signature: getUndoStack: () =\> UndoRedoAction[]

### Returns
- ` stack` - (UndoRedoAction[]) - 一个包含撤销用户操作的数组

### Example

~~~jsx
var stack = gantt.getUndoStack();
~~~

### Related samples
- [Gantt 中的撤销/重做更改](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
note 此方法属于 **undo** 扩展，因此必须启用 [undo](guides/extensions-list.md) 插件。更多详情请参见 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::


返回的栈是撤销用户操作的一个数组。每个用户操作包含一组命令。一个命令是具有以下属性的对象：
 
- **type** - (*string*) 命令的类型："add/remove/update"
- **entity** - (*string*) 被更改对象的类型： "task" 或 "link"
- **value** - (*object*) 已更改的 task/link 对象 
- **oldValue** - (*object*) 更改前的 task/link 对象

请看下面的示例：
![get_undo_stack](/img/get_undo_stack.png)

**getUndoStack()** 方法返回一个包含 2 个撤销用户操作的堆栈。第一个操作包含 3 个命令，第二个操作包含 1 个命令。

### Related API
- [getRedoStack](api/method/getredostack.md)
- [undo](api/method/undo.md)
- [clearUndoStack](api/method/clearundostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- added in version 4.0