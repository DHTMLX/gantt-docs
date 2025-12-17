---
sidebar_label: getUndoStack
title: getUndoStack method
description: "提供存储的撤销用户操作的堆栈"
---

# getUndoStack

### Description

@short: 提供存储的撤销用户操作的堆栈

@signature: getUndoStack: () =\> UndoRedoAction[]

### Returns
- ` stack` - (UndoRedoAction[]) - 包含撤销用户操作的数组

### Example

~~~jsx
var stack = gantt.getUndoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
note 此方法属于 **undo** 扩展，因此必须启用 [undo](guides/extensions-list.md) 插件。更多详情请参见 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::


返回的堆栈由撤销用户操作组成，每个操作包含一组命令。命令是具有以下属性的对象:

- **type** - (*string*) 指定命令类型:"add/remove/update"
- **entity** - (*string*) 指示被修改对象的类型:"task" 或 "link"
- **value** - (*object*) 变更后的任务或链接对象
- **oldValue** - (*object*) 变更前的任务或链接对象

下面是一个示例说明:

![get_undo_stack](/img/get_undo_stack.png)

**getUndoStack()** 方法返回一个包含 2 个撤销用户操作的堆栈。第一个操作包含 3 个命令，第二个操作包含 1 个命令。

### Related API
- [getRedoStack](api/method/getredostack.md)
- [undo](api/method/undo.md)
- [clearUndoStack](api/method/clearundostack.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 在版本 4.0 中新增

