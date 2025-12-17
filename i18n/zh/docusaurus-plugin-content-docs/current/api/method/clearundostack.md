---
sidebar_label: clearUndoStack
title: clearUndoStack method
description: "清除已存储的撤销命令栈"
---

# clearUndoStack

### Description

@short: 清除已存储的撤销命令栈

@signature: clearUndoStack: () =\> void

### Example

~~~jsx
gantt.clearUndoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 此方法属于**undo** 扩展的一部分，请确保已启用 [undo](guides/extensions-list.md) 插件。更多详细信息请参见 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::

### Related API
- [clearRedoStack](api/method/clearredostack.md)
- [undo](api/method/undo.md)
- [getUndoStack](api/method/getundostack.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 版本 5.2 中添加

