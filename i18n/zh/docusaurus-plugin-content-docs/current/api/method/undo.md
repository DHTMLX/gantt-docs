---
sidebar_label: undo
title: undo method
description: "撤销甘特图中的更改"
---

# undo

### Description

@short: 撤销对甘特图所做的更改

@signature: undo: () =\> void

### Example

~~~jsx
gantt.undo();
~~~

### Related samples
- [Gantt 中的撤销/重做变更](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
此方法在 **undo** 扩展中定义，因此您需要激活 [undo](guides/extensions-list.md#undo) 插件。请在 [Undo/Redo Functionality](guides/undo-redo.md) 条目中了解详细信息。
:::

### Related API
- [redo](api/method/redo.md)
- [getUndoStack](api/method/getundostack.md)
- [clearUndoStack](api/method/clearundostack.md)
- [onBeforeUndo](api/event/onbeforeundo.md)
- [onAfterUndo](api/event/onafterundo.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- 版本 4.0 中新增

