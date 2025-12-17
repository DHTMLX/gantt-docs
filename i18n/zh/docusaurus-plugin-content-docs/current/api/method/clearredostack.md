---
sidebar_label: clearRedoStack
title: clearRedoStack method
description: "重置保存重做命令的栈"
---

# clearRedoStack

### Description

@short: 重置保存重做命令的栈

@signature: clearRedoStack: () =\> void

### Example

~~~jsx
gantt.clearRedoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 此方法属于 **undo** 扩展的一部分，因此请确保先启用 [undo](guides/extensions-list.md) 插件。更多详情请参见 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::

### Related API
- [clearUndoStack](api/method/clearundostack.md)
- [redo](api/method/redo.md)
- [getRedoStack](api/method/getredostack.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 在版本 5.2 中添加

