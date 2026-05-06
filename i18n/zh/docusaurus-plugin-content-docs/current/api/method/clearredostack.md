---
sidebar_label: clearRedoStack
title: clearRedoStack 方法
description: "清空存储的重做命令堆栈"
---

# clearRedoStack

### Description

@short: 清空存储的重做命令堆栈

@signature: clearRedoStack: () => void

### Example

~~~jsx
gantt.clearRedoStack();
~~~

### Related samples
- [Gantt 撤销/重做变更](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
此方法定义在 **undo** 扩展中，因此你需要启用 [undo](guides/extensions-list.md#undo) 插件。请在 [Undo/Redo Functionality](guides/undo-redo.md) 文章中了解详细信息。
:::

### Related API
- [clearUndoStack](api/method/clearundostack.md)
- [redo](api/method/redo.md)
- [getRedoStack](api/method/getredostack.md)

### Related Guides
- [Undo/Redo 功能](guides/undo-redo.md)

### Change log
- 在 5.2 版本中新增