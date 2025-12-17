---
sidebar_label: getRedoStack
title: getRedoStack method
description: "提供存储的重做用户操作堆栈"
---

# getRedoStack

### Description

@short: 提供存储的重做用户操作堆栈

@signature: getRedoStack: () =\> UndoRedoAction[]

### Returns
- ` stack` - (UndoRedoAction[]) - 包含重做用户操作的数组

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


返回的堆栈由重做用户操作组成。每个操作包含一组命令。命令是具有以下属性的对象:
 
- **type** - (*string*) 指定命令类型:"add/remove/update"
- **entity** - (*string*) 表示更改的对象类型:"task" 或 "link"
- **value** - (*object*) 更新后的任务/链接对象 
- **oldValue** - (*object*) 变更前的任务/链接对象

请查看下面的示例:

![get_redo_stack](/img/get_redo_stack.png)

**getRedoStack()** 方法返回包含3个重做用户操作的堆栈。第一个和第二个操作各有1条命令，第三个操作包含3条命令。

### Related API
- [getUndoStack](api/method/getundostack.md)
- [redo](api/method/redo.md)
- [clearRedoStack](api/method/clearredostack.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 版本4.0新增

