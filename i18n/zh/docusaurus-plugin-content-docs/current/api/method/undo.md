---
sidebar_label: undo
title: undo method
description: "撤销甘特图中的更改"
---

# undo

### Description

@short: 撤销甘特图中的更改

@signature: undo: () =\> void

### Example

~~~jsx
gantt.undo();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 此方法属于 **undo** 扩展，因此请确保已启用 [undo](guides/extensions-list.md) 插件。更多信息请参见 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::

### Related API
- [redo](api/method/redo.md)
- [getUndoStack](api/method/getundostack.md)
- [clearUndoStack](api/method/clearundostack.md)
- [onBeforeUndo](api/event/onbeforeundo.md)
- [onAfterUndo](api/event/onafterundo.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 版本 4.0 中新增

